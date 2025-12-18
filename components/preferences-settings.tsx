"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { SettingsSection } from "@/components/settings-section"
import { useToast } from "@/hooks/use-toast"

export function PreferencesSettings() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [preferences, setPreferences] = useState({
    reportTemplate: "standard",
    confidenceThreshold: 75,
    language: "english",
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Preferences Saved",
        description: "Your preferences have been updated",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <SettingsSection title="Preferences" description="Customize your AutoRad-AI experience">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="template">Default Report Template</Label>
          <Select
            value={preferences.reportTemplate}
            onValueChange={(value) => setPreferences({ ...preferences, reportTemplate: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Template</SelectItem>
              <SelectItem value="detailed">Detailed Template</SelectItem>
              <SelectItem value="brief">Brief Template</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>AI Confidence Threshold</Label>
            <span className="text-sm font-semibold text-primary">{preferences.confidenceThreshold}%</span>
          </div>
          <Slider
            value={[preferences.confidenceThreshold]}
            onValueChange={(value) => setPreferences({ ...preferences, confidenceThreshold: value[0] })}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Only show AI findings above this confidence level</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select
            value={preferences.language}
            onValueChange={(value) => setPreferences({ ...preferences, language: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </SettingsSection>
  )
}
