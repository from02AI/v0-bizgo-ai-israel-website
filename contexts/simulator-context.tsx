"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Tool1Data {
  taskName?: string
  q1: number // Task type/nature (0/2/7/10) - creative to routine
  q2: number // Repetitiveness/consistency (0/5/10)
  q3: number // Documentation/examples availability (0/3/7/10)
  q4: number // Reserved (set to 0, not used in scoring)
  score: number // Final 0-10 score
  // Derived labels for PDF
  fitLabel?: string
  taskTypeLabel?: string
  repetitivenessLabel?: string
  documentationLabel?: string
}

export interface Tool2Data {
  q1: number // Infrastructure safety - backups (0/5/10 risk)
  q2: number // Error detection ease (1-10 slider, inverted to risk 0-9)
  q3: number // Error impact/consequences (0/5/10 risk)
  q4: number // Implementation capacity (1-10 slider, inverted to risk)
  weightedRisk: number // Calculated weighted risk score
  status: "green" | "yellow" | "red"
  // Derived labels for PDF
  safetyScore?: number
  safetyLabel?: string
  backupsLabel?: string
  errorDetectionLabel?: string
  errorConsequenceLabel?: string
  capacityLabel?: string
}

export interface Tool3Data {
  hoursPerWeek: number
  numEmployees: number
  hourlyRate: number
  learningHours: number // Auto-calculated from Tool1+Tool2
  sixMonthTotal: number
  breakEvenMonth: number
  riskAdjusted: boolean
  monthlyBreakdown: {
    month: number
    laborSaved: number
    learningCost: number
    maintenanceCost: number
    toolCost: number
    netSavings: number
    cumulativeSavings: number
  }[]
  // additional optional diagnostics
  estimatedMinBudget?: number
  monthlyBudgetUsed?: number
  implementationProfile?: 'self' | 'minimal' | 'full'
  tool1Score?: number
  tool2Status?: "green" | "yellow" | "red" | null
  // Derived labels for PDF
  technicalComfort?: string
  technicalComfortLabel?: string
  implementationProfileLabel?: string
  recommendedTier?: string
  budgetMin?: number
  budgetMax?: number
}

interface SimulatorContextType {
  currentTool: 1 | 2 | 3
  setCurrentTool: (tool: 1 | 2 | 3) => void
  currentQuestion: number
  setCurrentQuestion: (q: number) => void
  tool1Data: Tool1Data | null
  setTool1Data: (data: Tool1Data) => void
  tool2Data: Tool2Data | null
  setTool2Data: (data: Tool2Data) => void
  tool3Data: Tool3Data | null
  setTool3Data: (data: Tool3Data) => void
  resetSimulator: () => void
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined)

export function SimulatorProvider({ children }: { children: ReactNode }) {
  const [currentTool, setCurrentTool] = useState<1 | 2 | 3>(1)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [tool1Data, setTool1Data] = useState<Tool1Data | null>(null)
  const [tool2Data, setTool2Data] = useState<Tool2Data | null>(null)
  const [tool3Data, setTool3Data] = useState<Tool3Data | null>(null)

  const resetSimulator = () => {
    setCurrentTool(1)
    setCurrentQuestion(1)
    setTool1Data(null)
    setTool2Data(null)
    setTool3Data(null)
  }

  return (
    <SimulatorContext.Provider
      value={{
        currentTool,
        setCurrentTool,
        currentQuestion,
        setCurrentQuestion,
        tool1Data,
        setTool1Data,
        tool2Data,
        setTool2Data,
        tool3Data,
        setTool3Data,
        resetSimulator,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  )
}

export function useSimulator() {
  const context = useContext(SimulatorContext)
  if (!context) {
    throw new Error("useSimulator must be used within a SimulatorProvider")
  }
  return context
}
