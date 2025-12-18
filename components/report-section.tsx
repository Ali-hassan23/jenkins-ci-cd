"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/rich-text-editor"
import { RotateCcw } from "lucide-react"

interface ReportSectionProps {
  title: string
  description: string
  content: string
  onContentChange: (content: string) => void
  onRegenerate?: () => void
  isRegenerating?: boolean
}

export function ReportSection({
  title,
  description,
  content,
  onContentChange,
  onRegenerate,
  isRegenerating,
}: ReportSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {onRegenerate && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="ml-2 bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            {isRegenerating ? "Regenerating..." : "Regenerate"}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <RichTextEditor value={content} onChange={onContentChange} placeholder={`Enter ${title.toLowerCase()}...`} />
      </CardContent>
    </Card>
  )
}
