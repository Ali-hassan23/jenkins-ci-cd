"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Eye, Edit2, Trash2 } from "lucide-react"
import type { FilterState } from "./report-filters"

interface Report {
  id: string
  date: string
  patientId: string
  diagnosis: string
  status: "draft" | "finalized"
  preview: string
}

const mockReports: Report[] = [
  {
    id: "1",
    date: "2024-10-28",
    patientId: "P-001234",
    diagnosis: "Normal chest X-ray",
    status: "finalized",
    preview: "No acute findings on frontal and lateral chest radiographs.",
  },
  {
    id: "2",
    date: "2024-10-27",
    patientId: "P-001235",
    diagnosis: "Pneumonia - left lower lobe",
    status: "finalized",
    preview: "Consolidation in the left lower lobe consistent with pneumonia.",
  },
  {
    id: "3",
    date: "2024-10-27",
    patientId: "P-001236",
    diagnosis: "Pending review",
    status: "draft",
    preview: "Analysis in progress...",
  },
  {
    id: "4",
    date: "2024-10-26",
    patientId: "P-001237",
    diagnosis: "Pleural effusion",
    status: "finalized",
    preview: "Bilateral pleural effusions noted, left greater than right.",
  },
  {
    id: "5",
    date: "2024-10-26",
    patientId: "P-001238",
    diagnosis: "Atelectasis - right upper lobe",
    status: "draft",
    preview: "Right upper lobe atelectasis with mild mediastinal shift.",
  },
  {
    id: "6",
    date: "2024-10-25",
    patientId: "P-001239",
    diagnosis: "Pneumothorax",
    status: "finalized",
    preview: "Small right pneumothorax without hemodynamic compromise.",
  },
]

interface ReportsTableProps {
  filters: FilterState
}

export function ReportsTable({ filters }: ReportsTableProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [expandedReport, setExpandedReport] = useState<string | null>(null)

  const filteredReports = mockReports.filter((report) => {
    if (filters.dateFrom && report.date < filters.dateFrom) return false
    if (filters.dateTo && report.date > filters.dateTo) return false
    if (filters.patientId && !report.patientId.includes(filters.patientId)) return false
    if (filters.diagnosis && !report.diagnosis.toLowerCase().includes(filters.diagnosis.toLowerCase())) return false
    if (filters.status && report.status !== filters.status) return false
    return true
  })

  const toggleSelectReport = (id: string) => {
    setSelectedReports((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([])
    } else {
      setSelectedReports(filteredReports.map((r) => r.id))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report History</CardTitle>
        <CardDescription>
          {filteredReports.length} report{filteredReports.length !== 1 ? "s" : ""} found
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedReports.length > 0 && (
          <div className="mb-4 p-3 bg-primary/10 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{selectedReports.length} selected</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
              <Button variant="destructive" size="sm">
                Delete Selected
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 w-8">
                  <Checkbox
                    checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Patient ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Diagnosis</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                >
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={() => toggleSelectReport(report.id)}
                    />
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{report.date}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{report.patientId}</td>
                  <td className="py-3 px-4 text-foreground">{report.diagnosis}</td>
                  <td className="py-3 px-4">
                    <Badge variant={report.status === "finalized" ? "default" : "secondary"}>
                      {report.status === "finalized" ? "Finalized" : "Draft"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reports found matching your filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
