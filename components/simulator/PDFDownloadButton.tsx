"use client"

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Tool1Data, Tool2Data, Tool3Data } from '@/contexts/simulator-context'

interface PDFDownloadButtonProps {
  tool1Data: Tool1Data | null
  tool2Data: Tool2Data | null
  tool3Data: Tool3Data | null
}

export function PDFDownloadButton({ tool1Data, tool2Data, tool3Data }: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    if (!tool1Data && !tool2Data && !tool3Data) {
      setError('חסר מידע מהסימולטור ליצירת דוח')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tool1Data, tool2Data, tool3Data }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'failed')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `bizgo-ai-report-${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error generating PDF:', err)
      setError('שגיאה ביצירת הקובץ. נסה שוב.')
    } finally {
      setIsGenerating(false)
    }
  }
  
  return (
    <div className="space-y-2">
      <Button
        onClick={handleDownload}
        disabled={isGenerating}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-6 text-lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin ml-2" />
            מייצר PDF...
          </>
        ) : (
          <>
            <Download className="w-5 h-5 ml-2" />
            הורד דוח PDF
          </>
        )}
      </Button>
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </div>
  )
}
