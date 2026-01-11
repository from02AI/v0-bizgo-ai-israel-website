/** @jest-environment jsdom */
const React = require('react')
const { render, screen, act } = require('@testing-library/react')
const { fireEvent } = require('@testing-library/react')
const { SimulatorProvider, useSimulator } = require('@/contexts/simulator-context')
const { Tool3ROI } = require('@/components/simulator/tool3-roi')

function PreloadProvider({ children }) {
  const { setTool1Data, setTool2Data } = useSimulator()
  React.useEffect(() => {
    setTool1Data({ q1: 2, q2: 5, q3: 7, q4: 0, score: 6 })
    setTool2Data({ q1: 0, q2: 3, q3: 3, q4: 3, weightedRisk: 2.2, status: 'green' })
  }, [])

  return children
}

describe('Tool3 ROI calculations (unit)', () => {
  test('calculates and displays results with preloaded context', async () => {
    render(
      React.createElement(SimulatorProvider, null,
        React.createElement(PreloadProvider, null,
          React.createElement(Tool3ROI)
        )
      )
    )

    // Step 1 inputs (use defaults) -> continue
    const cont = screen.getByText(/המשך/)
    await act(async () => fireEvent.click(cont))

    // Step 2 & 3 defaults -> click selections
    const tech = await screen.findByText(/בינונית/)
    await act(async () => fireEvent.click(tech))
    const impl = await screen.findByText(/עזרה מינימלית|עזרה מינימלית/)
    await act(async () => fireEvent.click(impl))

    // Step 4: choose simulator budget and calculate
    const calcBtn = await screen.findByText(/חישוב תוצאות/)
    await act(async () => fireEvent.click(calcBtn))

    // Expect results panel
    expect(await screen.findByText(/תחזית חיסכון ל־6 חודשים/)).toBeTruthy()
    const totals = await screen.findAllByText(/₪/)
    expect(totals.length).toBeGreaterThan(0)
  })
})
