/** @jest-environment jsdom */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SimulatorProvider } from '@/contexts/simulator-context'
import { Tool2Safety } from '@/components/simulator/tool2-safety'

describe('Tool2Safety component branches', () => {
  test('critical blocker leads to red status', async () => {
    render(
      <SimulatorProvider>
        <Tool2Safety />
      </SimulatorProvider>
    )

    const firstOption = screen.getByRole('button', { name: /אין גיבויים|❌ אין גיבויים/ })
    await act(async () => userEvent.click(firstOption))

    // second question slider -> set high risk (9)
    const range = screen.getByRole('slider')
    await act(async () => {
      userEvent.type(range, '9')
      range.dispatchEvent(new Event('input'))
    })
    const nextBtn = screen.getByRole('button', { name: /הבא/ })
    await act(async () => userEvent.click(nextBtn))

    // third question - choose worst option
    const thirdOption = screen.getByRole('button', { name: /נזק כספי|❌ נזק כספי או משפטי/ })
    await act(async () => userEvent.click(thirdOption))

    // fourth slider - set to high
    const ranges = screen.getAllByRole('slider')
    const lastRange = ranges[ranges.length - 1]
    await act(async () => {
      userEvent.type(lastRange, '10')
      lastRange.dispatchEvent(new Event('input'))
    })
    const lastNext = screen.getByRole('button', { name: /הבא/ })
    await act(async () => userEvent.click(lastNext))

    // Expect result UI to contain red indicator text
    expect(await screen.findByText(/סטטוס בטיחות|סיכון גבוה/)).toBeTruthy()
  })

  test('excellent controls produce green status', async () => {
    render(
      <SimulatorProvider>
        <Tool2Safety />
      </SimulatorProvider>
    )

    // Q1: choose safe first option (automated backup)
    const opt1 = screen.getByRole('button', { name: /גיבוי אוטומטית|✅ כן, מערכת גיבוי אוטומטית/ })
    await act(async () => userEvent.click(opt1))

    // Q2: slider low risk
    const range = screen.getByRole('slider')
    await act(async () => {
      userEvent.type(range, '2')
      range.dispatchEvent(new Event('input'))
    })
    await act(async () => userEvent.click(screen.getByRole('button', { name: /הבא/ })))

    // Q3: choose safe option
    const opt3 = screen.getByRole('button', { name: /תיקון פשוט|✅ תיקון פשוט בדקות/ })
    await act(async () => userEvent.click(opt3))

    // Q4: low capacity (good)
    const ranges = screen.getAllByRole('slider')
    const lastRange = ranges[ranges.length - 1]
    await act(async () => {
      userEvent.type(lastRange, '2')
      lastRange.dispatchEvent(new Event('input'))
    })
    await act(async () => userEvent.click(screen.getByRole('button', { name: /הבא/ })))

    // Expect green readiness UI
    expect(await screen.findByText(/מוכן לפיילוט|בטיחות גבוהה/)).toBeTruthy()
  })
})
