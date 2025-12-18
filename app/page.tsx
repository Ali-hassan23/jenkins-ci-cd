"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Activity } from "lucide-react"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-primary p-3 rounded-lg">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">AutoRad-AI</h1>
        <p className="text-muted-foreground mb-8">AI-Powered Radiology Report Generation</p>
        <div className="space-y-3">
          <Button
            onClick={() => router.push("/login")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            Sign In
          </Button>
          <Button onClick={() => router.push("/signup")} variant="outline" className="w-full" size="lg">
            Create Account
          </Button>
        </div>
      </div>
    </div>
  )
}
