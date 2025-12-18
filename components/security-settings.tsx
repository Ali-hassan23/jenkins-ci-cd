"use client"

import { Button } from "@/components/ui/button"
import { SettingsSection } from "@/components/settings-section"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle } from "lucide-react"

export function SecuritySettings() {
  const { toast } = useToast()

  const handleEnableTwoFactor = () => {
    toast({
      title: "Two-Factor Authentication",
      description: "Feature coming soon",
    })
  }

  const handleViewSessions = () => {
    toast({
      title: "Active Sessions",
      description: "You have 1 active session",
    })
  }

  return (
    <SettingsSection title="Security" description="Manage your account security">
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-900 dark:text-amber-100">Two-Factor Authentication</p>
            <p className="text-sm text-amber-700 dark:text-amber-300">Not enabled - Enhance your account security</p>
          </div>
        </div>

        <Button onClick={handleEnableTwoFactor} className="bg-primary hover:bg-primary/90">
          Enable Two-Factor Authentication
        </Button>

        <div className="border-t border-border pt-4">
          <p className="font-medium text-foreground mb-3">Active Sessions</p>
          <p className="text-sm text-muted-foreground mb-3">Manage devices that have access to your account</p>
          <Button variant="outline" onClick={handleViewSessions}>
            View Active Sessions
          </Button>
        </div>
      </div>
    </SettingsSection>
  )
}
