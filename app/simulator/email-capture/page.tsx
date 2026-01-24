"use client"

import { EmailCapture } from "@/components/simulator/email-capture"

export default function EmailCapturePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="relative">
        <a href="/" className="absolute left-4 top-4 text-2xl font-bold text-[#0b2e7b] z-50">BizGoAI</a>
        <main>
          <EmailCapture />
        </main>
      </div>
    </div>
  )
}
