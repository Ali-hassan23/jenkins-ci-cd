"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ReportFilters, type FilterState } from "@/components/report-filters"
import { ReportsTable } from "@/components/reports-table"

export default function HistoryPage() {
  const [filters, setFilters] = useState<FilterState>({
    dateFrom: "",
    dateTo: "",
    diagnosis: "",
    patientId: "",
    status: "",
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="Dr. Sarah Johnson" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Report History</h1>
          <p className="text-muted-foreground">View and manage all your radiology reports</p>
        </div>

        <div className="space-y-6">
          <ReportFilters onFiltersChange={setFilters} />
          <ReportsTable filters={filters} />
        </div>
      </main>
    </div>
  )
}
