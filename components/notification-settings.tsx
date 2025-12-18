"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SettingsSection } from "@/components/settings-section"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [notifications, setNotifications] = useState({
    analysisComplete: true,
    reportFinalized: true,
    weeklyDigest: true,
    systemUpdates: false,
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Notifications Updated",
        description: "Your notification preferences have been saved",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <SettingsSection title="Notifications" description="Manage your notification preferences">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Analysis Complete</Label>
            <p className="text-sm text-muted-foreground">Notify when image analysis is complete</p>
          </div>
          <Switch
            checked={notifications.analysisComplete}
            onCheckedChange={(checked) => setNotifications({ ...notifications, analysisComplete: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Report Finalized</Label>
            <p className="text-sm text-muted-foreground">Notify when a report is finalized</p>
          </div>
          <Switch
            checked={notifications.reportFinalized}
            onCheckedChange={(checked) => setNotifications({ ...notifications, reportFinalized: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Weekly Digest</Label>
            <p className="text-sm text-muted-foreground">Receive weekly summary of your reports</p>
          </div>
          <Switch
            checked={notifications.weeklyDigest}
            onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">System Updates</Label>
            <p className="text-sm text-muted-foreground">Notify about system updates and maintenance</p>
          </div>
          <Switch
            checked={notifications.systemUpdates}
            onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
          />
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 mt-4">
          {isSaving ? "Saving..." : "Save Notifications"}
        </Button>
      </div>
    </SettingsSection>
  )
}
