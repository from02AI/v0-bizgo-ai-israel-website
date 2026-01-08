"use client"

import { SimulatorProvider, useSimulator } from "@/contexts/simulator-context"
import { ProgressBar } from "@/components/simulator/progress-bar"
import { Tool1Opportunity } from "@/components/simulator/tool1-opportunity"
import { Tool2Safety } from "@/components/simulator/tool2-safety"
import { Tool3ROI } from "@/components/simulator/tool3-roi"

function SimulatorContent() {
  const { currentTool } = useSimulator()

  const toolNames = {
    1: "מאתר הזדמנויות AI",
    2: "נקודת בדיקת בטיחות",
    3: "מחשבון ROI",
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <ProgressBar currentTool={currentTool} toolName={toolNames[currentTool]} />
      <main>
        {currentTool === 1 && <Tool1Opportunity />}
        {currentTool === 2 && <Tool2Safety />}
        {currentTool === 3 && <Tool3ROI />}
      </main>
    </div>
  )
}

export default function SimulatorPage() {
  return (
    <SimulatorProvider>
      <SimulatorContent />
    </SimulatorProvider>
  )
}
