"use client"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatCard } from "@/components/stat-card"
import { RecentReportsTable } from "@/components/recent-reports-table"
import { FileText, Clock, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="Dr. Sarah Johnson" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Reports Generated"
            value="247"
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard title="Pending Reviews" value="8" icon={Clock} trend={{ value: 2, isPositive: false }} />
          <StatCard title="Reports This Week" value="34" icon={TrendingUp} trend={{ value: 8, isPositive: true }} />
          <StatCard title="Avg. Analysis Time" value="2.3m" icon={Clock} trend={{ value: 5, isPositive: true }} />
        </div>

        {/* New Analysis Card */}
        <div className="mb-8">
          <Link href="/upload">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Start New Analysis</h3>
                    <p className="text-muted-foreground">Upload a new X-ray image for AI analysis</p>
                  </div>
                  <div className="bg-primary p-4 rounded-lg">
                    <Plus className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Reports */}
        <RecentReportsTable />
      </main>
    </div>
  )
}
