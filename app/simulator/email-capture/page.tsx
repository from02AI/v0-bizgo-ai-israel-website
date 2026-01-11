"use client"

import { ProgressBar } from "@/components/simulator/progress-bar"
import { EmailCapture } from "@/components/simulator/email-capture"

export default function EmailCapturePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <ProgressBar currentTool={3} toolName="סיום" />
      <main>
        <EmailCapture />
      </main>
    </div>
  )
}
