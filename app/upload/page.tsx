"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { ImageUploadZone } from "@/components/image-upload-zone"
import { PatientInfoForm, type PatientInfo } from "@/components/patient-info-form"
import { AnalysisResults } from "@/components/analysis-results"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface Abnormality {
  name: string
  confidence: number
  severity: "low" | "medium" | "high"
}

export default function UploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    patientId: "",
    age: "",
    gender: "",
    clinicalHistory: "",
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<Abnormality[]>([])
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const handleImageSelect = (file: File | null, preview: string) => {
    setImageFile(file)
    setSelectedImage(preview)
    setAnalysisComplete(false)
    setAnalysisResults([])
  }

  const handleAnalyze = async () => {
    if (!selectedImage || !patientInfo.patientId) {
      toast({
        title: "Missing Information",
        description: "Please upload an image and enter patient ID",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    try {
      // Simulate API call with progress
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock analysis results
      const mockResults: Abnormality[] = [
        { name: "Pneumonia - Left Lower Lobe", confidence: 87, severity: "high" },
        { name: "Mild Pleural Effusion", confidence: 62, severity: "medium" },
        { name: "Atelectasis", confidence: 45, severity: "low" },
      ]

      setAnalysisResults(mockResults)
      setAnalysisComplete(true)

      toast({
        title: "Analysis Complete",
        description: "AI analysis finished successfully",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGenerateReport = () => {
    if (!analysisComplete) {
      toast({
        title: "Analysis Required",
        description: "Please complete the analysis first",
        variant: "destructive",
      })
      return
    }

    // Navigate to report editor with analysis data
    router.push("/report-editor")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="Dr. Sarah Johnson" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">New X-Ray Analysis</h1>
          <p className="text-muted-foreground">Upload and analyze a chest X-ray image</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload and Patient Info */}
          <div className="lg:col-span-2 space-y-6">
            <ImageUploadZone onImageSelect={handleImageSelect} selectedImage={selectedImage} />
            <PatientInfoForm onDataChange={setPatientInfo} />

            {/* Analyze Button */}
            <Card>
              <CardContent className="pt-6">
                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedImage || isAnalyzing}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    "Analyze Image"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-1">
            <AnalysisResults isLoading={isAnalyzing} abnormalities={analysisResults} />

            {analysisComplete && (
              <Button
                onClick={handleGenerateReport}
                className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Generate Report
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
