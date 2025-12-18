"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, List, Sparkles } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function RichTextEditor({ value, onChange, placeholder, rows = 6 }: RichTextEditorProps) {
  const [charCount, setCharCount] = useState(value.length)

  const handleChange = (newValue: string) => {
    onChange(newValue)
    setCharCount(newValue.length)
  }

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end)

    handleChange(newValue)
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-1 p-2 bg-muted rounded-t-lg border border-border border-b-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("**", "**")}
          title="Bold"
          className="hover:bg-primary/10"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("*", "*")}
          title="Italic"
          className="hover:bg-primary/10"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("- ")}
          title="Bullet point"
          className="hover:bg-primary/10"
        >
          <List className="w-4 h-4" />
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="sm" className="hover:bg-primary/10" title="Medical suggestions">
          <Sparkles className="w-4 h-4" />
        </Button>
      </div>
      <Textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="rounded-b-lg"
      />
      <div className="text-xs text-muted-foreground text-right">{charCount} characters</div>
    </div>
  )
}
