"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { ProfileSettings } from "@/components/profile-settings"
import { PasswordSettings } from "@/components/password-settings"
import { PreferencesSettings } from "@/components/preferences-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { SecuritySettings } from "@/components/security-settings"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="Dr. Sarah Johnson" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          <ProfileSettings />
          <PasswordSettings />
          <PreferencesSettings />
          <NotificationSettings />
          <SecuritySettings />
        </div>
      </main>
    </div>
  )
}
