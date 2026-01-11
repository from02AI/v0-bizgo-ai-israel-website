"use client"

import type { ReactNode } from "react"
import { SimulatorProvider } from "@/contexts/simulator-context"

export default function SimulatorLayout({ children }: { children: ReactNode }) {
  return <SimulatorProvider>{children}</SimulatorProvider>
}
