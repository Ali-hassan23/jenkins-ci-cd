"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PatientInfoFormProps {
  onDataChange: (data: PatientInfo) => void
}

export interface PatientInfo {
  patientId: string
  age: string
  gender: string
  clinicalHistory: string
}

export function PatientInfoForm({ onDataChange }: PatientInfoFormProps) {
  const [formData, setFormData] = useState<PatientInfo>({
    patientId: "",
    age: "",
    gender: "",
    clinicalHistory: "",
  })

  const handleChange = (field: keyof PatientInfo, value: string) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    onDataChange(updated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Information</CardTitle>
        <CardDescription>Enter patient details for the analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient ID</Label>
            <Input
              id="patientId"
              placeholder="P-001234"
              value={formData.patientId}
              onChange={(e) => handleChange("patientId", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="45"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="clinicalHistory">Clinical History</Label>
          <Textarea
            id="clinicalHistory"
            placeholder="Enter relevant clinical history, symptoms, or notes..."
            value={formData.clinicalHistory}
            onChange={(e) => handleChange("clinicalHistory", e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )
}
