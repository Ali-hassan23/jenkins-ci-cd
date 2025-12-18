"use client"

import { useState } from "react"
import { ReportEditorLayout } from "@/components/report-editor-layout"
import { ReportSection } from "@/components/report-section"

interface ReportData {
  demographics: string
  clinicalHistory: string
  findings: string
  impressions: string
  recommendations: string
}

export default function ReportEditorPage() {
  const [reportData, setReportData] = useState<ReportData>({
    demographics: "Patient ID: P-001234\nAge: 45 years\nGender: Male\nDate of Study: 2024-10-28",
    clinicalHistory:
      "Patient presents with persistent cough and fever for 5 days. Recent exposure to respiratory illness. No significant past medical history.",
    findings:
      "Frontal and lateral chest radiographs demonstrate consolidation in the left lower lobe consistent with pneumonia. Mild pleural effusion noted on the left side. No pneumothorax. Heart size is normal.",
    impressions:
      "1. Left lower lobe pneumonia\n2. Mild left pleural effusion\n3. No acute cardiopulmonary process otherwise",
    recommendations:
      "1. Clinical correlation recommended\n2. Follow-up chest X-ray in 4-6 weeks to document resolution\n3. Consider CT chest if clinical deterioration occurs",
  })

  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null)

  const handleSectionChange = (section: keyof ReportData, content: string) => {
    setReportData((prev) => ({ ...prev, [section]: content }))
  }

  const handleRegenerate = async (section: keyof ReportData) => {
    setRegeneratingSection(section)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Simulate regenerated content
      const regeneratedContent = `[Regenerated ${section}]\n${reportData[section]}`
      handleSectionChange(section, regeneratedContent)
    } finally {
      setRegeneratingSection(null)
    }
  }

  return (
    <ReportEditorLayout xrayImage="/chest-xray.jpg">
      <div className="space-y-6">
        <ReportSection
          title="Patient Demographics"
          description="Auto-filled patient information"
          content={reportData.demographics}
          onContentChange={(content) => handleSectionChange("demographics", content)}
        />

        <ReportSection
          title="Clinical History"
          description="Patient background and symptoms"
          content={reportData.clinicalHistory}
          onContentChange={(content) => handleSectionChange("clinicalHistory", content)}
          onRegenerate={() => handleRegenerate("clinicalHistory")}
          isRegenerating={regeneratingSection === "clinicalHistory"}
        />

        <ReportSection
          title="Findings"
          description="AI-generated findings, editable"
          content={reportData.findings}
          onContentChange={(content) => handleSectionChange("findings", content)}
          onRegenerate={() => handleRegenerate("findings")}
          isRegenerating={regeneratingSection === "findings"}
        />

        <ReportSection
          title="Impressions"
          description="Summary of key findings"
          content={reportData.impressions}
          onContentChange={(content) => handleSectionChange("impressions", content)}
          onRegenerate={() => handleRegenerate("impressions")}
          isRegenerating={regeneratingSection === "impressions"}
        />

        <ReportSection
          title="Recommendations"
          description="Clinical recommendations and follow-up"
          content={reportData.recommendations}
          onContentChange={(content) => handleSectionChange("recommendations", content)}
          onRegenerate={() => handleRegenerate("recommendations")}
          isRegenerating={regeneratingSection === "recommendations"}
        />
      </div>
    </ReportEditorLayout>
  )
}
