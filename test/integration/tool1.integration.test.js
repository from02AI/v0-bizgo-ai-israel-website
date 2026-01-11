/**
 * Integration tests for Tool1Opportunity using React Testing Library
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SimulatorProvider } from '../../contexts/simulator-context'
import { Tool1Opportunity } from '../../components/simulator/tool1-opportunity'

test('Tool1 full flow produces expected score shown in UI', async () => {
  render(
    <SimulatorProvider>
      <Tool1Opportunity />
    </SimulatorProvider>
  )

  const user = userEvent.setup()

  // First question - choose the routine admin option (10 points)
  const btn1 = await screen.findByRole('button', { name: /🔄 משימות אדמיניסטרטיביות שגרתיות/i })
  await user.click(btn1)

  // Second question - choose 'almost identical every time' (10 points)
  const btn2 = await screen.findByRole('button', { name: /תהליך זהה או כמעט זהה בכל פעם/i })
  await user.click(btn2)

  // Third question - choose large examples (10 points)
  const btn3 = await screen.findByRole('button', { name: /🗄️ מאגר גדול/i })
  await user.click(btn3)

  // After answering, the results UI should show score 10
  const scores = await screen.findAllByText(/^10$/)
  expect(scores.length).toBeGreaterThan(0)
})
