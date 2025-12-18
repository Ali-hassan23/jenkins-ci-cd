"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SettingsSection } from "@/components/settings-section"
import { useToast } from "@/hooks/use-toast"

export function ProfileSettings() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    licenseNumber: "LIC-123456",
    specialty: "Chest Radiology",
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <SettingsSection title="Profile Information" description="Update your personal information">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={profileData.fullName}
            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="licenseNumber">Medical License Number</Label>
          <Input
            id="licenseNumber"
            value={profileData.licenseNumber}
            onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialty">Specialty</Label>
          <Input id="specialty" value={profileData.specialty} disabled className="bg-muted" />
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </SettingsSection>
  )
}
