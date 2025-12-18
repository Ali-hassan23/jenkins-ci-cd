"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle } from "lucide-react"

interface Abnormality {
  name: string
  confidence: number
  severity: "low" | "medium" | "high"
}

interface AnalysisResultsProps {
  isLoading: boolean
  abnormalities: Abnormality[]
}

export function AnalysisResults({ isLoading, abnormalities }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis Results</CardTitle>
          <CardDescription>Processing image...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Analysis Results</CardTitle>
        <CardDescription>Detected abnormalities and confidence scores</CardDescription>
      </CardHeader>
      <CardContent>
        {abnormalities.length === 0 ? (
          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">No abnormalities detected</p>
              <p className="text-sm text-green-700 dark:text-green-300">Image appears normal</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {abnormalities.map((abnormality, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    <h4 className="font-medium text-foreground">{abnormality.name}</h4>
                  </div>
                  <Badge
                    variant={
                      abnormality.severity === "high"
                        ? "destructive"
                        : abnormality.severity === "medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {abnormality.severity.charAt(0).toUpperCase() + abnormality.severity.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${abnormality.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{abnormality.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
