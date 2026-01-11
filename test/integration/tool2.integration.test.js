/**
 * Integration tests for Tool2Safety using React Testing Library
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SimulatorProvider } from '../../contexts/simulator-context'
import { Tool2Safety } from '../../components/simulator/tool2-safety'

test('Tool2 flow produces a safety score and status', async () => {
  render(
    <SimulatorProvider>
      <Tool2Safety />
    </SimulatorProvider>
  )

  const user = userEvent.setup()

  // Q1: choose automatic backups (risk 0)
  const q1 = await screen.findByRole('button', { name: /✅ כן, מערכת גיבוי אוטומטית/i })
  await user.click(q1)

  // Q2: slider - choose value 2
  const slider = await screen.findByRole('slider')
  await userEvent.type(slider, '2')
  const nextBtn = await screen.findByRole('button', { name: /בא/i })
  await user.click(nextBtn)

  // Q3: choose easy fix (risk 0)
  const q3 = await screen.findByRole('button', { name: /✅ תיקון פשוט בדקות/i })
  await user.click(q3)

  // Q4: slider - choose value 2 and submit
  const slider2 = await screen.findByRole('slider')
  await userEvent.type(slider2, '2')
  const submit = await screen.findByRole('button', { name: /בא/i })
  await user.click(submit)

  // Results should show a safety score text (e.g., /10)
  const score = await screen.findByText(/\/10/) // matches 'x/10'
  expect(score).toBeTruthy()
})
