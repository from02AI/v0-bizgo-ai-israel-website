"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Tool1Data {
  q1: number // frequency points
  q2: number // repetitiveness points
  q3: number // time points
  q4: number // task type points
  score: number
}

export interface Tool2Data {
  q1: number // backup risk
  q2: number // error detection risk
  q3: number // impact risk
  q4: number // learning capacity risk
  maxRisk: number
  status: "green" | "yellow" | "red"
}

export interface Tool3Data {
  hoursPerTask: number
  timesPerMonth: number
  hourlyRate: number
  learningHours: string
  maintenanceHours: number
  toolCost: number
  sixMonthTotal: number
  monthlyBreakdown: {
    month: number
    laborSaved: number
    learningCost: number
    maintenanceCost: number
    toolCost: number
    netSavings: number
  }[]
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
