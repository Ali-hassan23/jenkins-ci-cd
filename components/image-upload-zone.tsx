"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadZoneProps {
  onImageSelect: (file: File, preview: string) => void
  selectedImage: string | null
}

export function ImageUploadZone({ onImageSelect, selectedImage }: ImageUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const processFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png"]
    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPG or PNG image")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      onImageSelect(file, preview)
    }
    reader.readAsDataURL(file)
  }

  if (selectedImage) {
    return (
      <Card className="border-2 border-primary/20">
        <CardContent className="pt-6">
          <div className="relative">
            <img src={selectedImage || "/placeholder.svg"} alt="X-ray preview" className="w-full h-auto rounded-lg" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => onImageSelect(null as any, "")}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`border-2 border-dashed transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="pt-12 pb-12">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <Upload className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Upload X-Ray Image</h3>
          <p className="text-muted-foreground mb-4">Drag and drop your image here or click to browse</p>
          <p className="text-xs text-muted-foreground mb-4">Supported formats: JPG, PNG, DICOM</p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Select Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.dcm"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  )
}
