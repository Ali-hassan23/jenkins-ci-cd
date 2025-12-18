"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Save, CheckCircle, ZoomIn, ZoomOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReportEditorLayoutProps {
  children: React.ReactNode
  xrayImage?: string
}

export function ReportEditorLayout({ children, xrayImage }: ReportEditorLayoutProps) {
  const { toast } = useToast()
  const [zoom, setZoom] = useState(100)
  const [isSaving, setIsSaving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleSaveDraft = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Draft Saved",
        description: "Your report has been saved as draft",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleFinalize = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Report Finalized",
        description: "Your report has been finalized and locked",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "PDF Downloaded",
        description: "Your report has been downloaded",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Report Editor</h1>
          <p className="text-muted-foreground">Last saved: 2 minutes ago</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* X-Ray Image */}
          {xrayImage && (
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg overflow-hidden">
                      <img
                        src={xrayImage || "/placeholder.svg?height=400&width=300&query=chest-xray"}
                        alt="X-ray"
                        style={{ transform: `scale(${zoom / 100})` }}
                        className="w-full h-auto transition-transform"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setZoom(Math.max(50, zoom - 10))}
                        className="flex-1"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <span className="flex items-center px-3 text-sm font-medium">{zoom}%</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setZoom(Math.min(200, zoom + 10))}
                        className="flex-1"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Report Content */}
          <div className={xrayImage ? "lg:col-span-2" : "lg:col-span-3"}>{children}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button onClick={handleFinalize} disabled={isSaving} className="bg-accent hover:bg-accent/90">
            <CheckCircle className="w-4 h-4 mr-2" />
            Finalize Report
          </Button>
          <Button onClick={handleDownloadPDF} disabled={isDownloading} className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
        </div>
      </div>
    </div>
  )
}
