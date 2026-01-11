/** @jest-environment jsdom */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SimulatorProvider, useSimulator } from '@/contexts/simulator-context'
import { Tool3ROI } from '@/components/simulator/tool3-roi'

function PreloadProvider({ children }) {
  const { setTool1Data, setTool2Data } = useSimulator()
  // set reasonable Tool1/Tool2 to drive calculations
  React.useEffect(() => {
    setTool1Data({ q1: 2, q2: 5, q3: 7, q4: 0, score: 6 })
    setTool2Data({ q1: 0, q2: 3, q3: 3, q4: 3, weightedRisk: 2.2, status: 'green' })
  }, [])

  return children
}

describe('Tool3 ROI calculations (unit)', () => {
  test('calculates and displays results with preloaded context', async () => {
    render(
      <SimulatorProvider>
        <PreloadProvider>
          <Tool3ROI />
        </PreloadProvider>
      </SimulatorProvider>
    )

    // Step 1 inputs (use defaults) -> continue
    const cont = screen.getByText(/המשך/)
    await act(async () => userEvent.click(cont))

    // Step 2 & 3 defaults -> click selections
    const tech = await screen.findByText(/בינונית/)
    await act(async () => userEvent.click(tech))
    const impl = await screen.findByText(/עזרה מינימלית|עזרה מינימלית/)
    await act(async () => userEvent.click(impl))

    // Step 4: choose simulator budget and calculate
    const calcBtn = await screen.findByText(/חישוב תוצאות/)
    await act(async () => userEvent.click(calcBtn))

    // Expect results panel
    expect(await screen.findByText(/תחזית חיסכון ל־6 חודשים/)).toBeTruthy()
    const totalEl = screen.getByText(/₪/)
    expect(totalEl).toBeTruthy()
  })
})
