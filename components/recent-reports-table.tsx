"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Edit2, Search } from "lucide-react"

interface Report {
  id: string
  date: string
  patientId: string
  diagnosis: string
  status: "draft" | "finalized"
}

const mockReports: Report[] = [
  {
    id: "1",
    date: "2024-10-28",
    patientId: "P-001234",
    diagnosis: "Normal chest X-ray",
    status: "finalized",
  },
  {
    id: "2",
    date: "2024-10-27",
    patientId: "P-001235",
    diagnosis: "Pneumonia - left lower lobe",
    status: "finalized",
  },
  {
    id: "3",
    date: "2024-10-27",
    patientId: "P-001236",
    diagnosis: "Pending review",
    status: "draft",
  },
  {
    id: "4",
    date: "2024-10-26",
    patientId: "P-001237",
    diagnosis: "Pleural effusion",
    status: "finalized",
  },
  {
    id: "5",
    date: "2024-10-26",
    patientId: "P-001238",
    diagnosis: "Atelectasis - right upper lobe",
    status: "draft",
  },
]

export function RecentReportsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReports = mockReports.filter(
    (report) =>
      report.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
        <CardDescription>Your latest radiology reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient ID or diagnosis..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Patient ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Diagnosis</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{report.date}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{report.patientId}</td>
                  <td className="py-3 px-4 text-foreground">{report.diagnosis}</td>
                  <td className="py-3 px-4">
                    <Badge variant={report.status === "finalized" ? "default" : "secondary"}>
                      {report.status === "finalized" ? "Finalized" : "Draft"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
