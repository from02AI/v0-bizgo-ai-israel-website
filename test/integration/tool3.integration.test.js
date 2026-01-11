/**
 * Integration test for Tool3ROI using SimulatorProvider and pre-setting Tool1/Tool2 data
 */
import React, { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SimulatorProvider, useSimulator } from '../../contexts/simulator-context'
import { Tool3ROI } from '../../components/simulator/tool3-roi'

function PreSet({ children }) {
  const { setTool1Data, setTool2Data } = useSimulator()
  useEffect(() => {
    setTool1Data({ q1: 10, q2: 10, q3: 10, q4: 0, taskName: 'Test', score: 10 })
    setTool2Data({ q1: 0, q2: 2, q3: 0, q4: 1, weightedRisk: 1.1, status: 'green' })
  }, [setTool1Data, setTool2Data])
  return children
}

test('Tool3 shows results after filling form and calculating', async () => {
  render(
    <SimulatorProvider>
      <PreSet>
        <Tool3ROI />
      </PreSet>
    </SimulatorProvider>
  )

  const user = userEvent.setup()

  // adjust sliders if present and proceed through steps
  const ranges = await screen.findAllByRole('slider')
  if (ranges.length > 0) {
    const first = ranges[0]
    // set a different value using change event (range inputs)
    const { fireEvent } = require('@testing-library/react')
    fireEvent.change(first, { target: { value: '6' } })
  }

  // Step 1: click the continue button
  const continueBtn = await screen.findByText(/המשך|המשך ←/i)
  await user.click(continueBtn)

  // Step 2: choose a tech comfort option (one of the visible buttons)
  const techElems = await screen.findAllByText(/גבוהה|בינונית|נמוכה|אין נסיון/i)
  const techBtn = techElems[0].closest('button')
  await user.click(techBtn)

  // Step 3: choose implementation profile
  const implElems = await screen.findAllByText(/אני בעצמי|עזרה מינימלית|עזרה מלאה/i)
  const implBtn = implElems[0].closest('button')
  await user.click(implBtn)

  // Step 4: click calculate
  const calcBtn = await screen.findByText(/חישוב תוצאות|חישוב תוצאות ←/i)
  await user.click(calcBtn)

  // Results should show the 6-month total currency symbol (may be split across nodes)
  const results = await screen.findAllByText((content, node) => content.includes('₪'))
  expect(results.length).toBeGreaterThan(0)
})
