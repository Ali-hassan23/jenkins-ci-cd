"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ReportFiltersProps {
  onFiltersChange: (filters: FilterState) => void
}

export interface FilterState {
  dateFrom: string
  dateTo: string
  diagnosis: string
  patientId: string
  status: string
}

export function ReportFilters({ onFiltersChange }: ReportFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateFrom: "",
    dateTo: "",
    diagnosis: "",
    patientId: "",
    status: "",
  })

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    const updated = { ...filters, [field]: value }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const handleReset = () => {
    const empty: FilterState = {
      dateFrom: "",
      dateTo: "",
      diagnosis: "",
      patientId: "",
      status: "",
    }
    setFilters(empty)
    onFiltersChange(empty)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateFrom">Date From</Label>
            <Input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateTo">Date To</Label>
            <Input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="patientId">Patient ID</Label>
            <Input
              id="patientId"
              placeholder="P-001234"
              value={filters.patientId}
              onChange={(e) => handleFilterChange("patientId", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Select value={filters.diagnosis} onValueChange={(value) => handleFilterChange("diagnosis", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Diagnoses</SelectItem>
                <SelectItem value="pneumonia">Pneumonia</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="effusion">Pleural Effusion</SelectItem>
                <SelectItem value="atelectasis">Atelectasis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="finalized">Finalized</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={handleReset} className="mt-4 bg-transparent">
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  )
}
