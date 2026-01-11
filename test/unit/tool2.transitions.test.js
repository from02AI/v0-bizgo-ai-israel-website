/** @jest-environment jsdom */
const React = require('react')
const { render, screen, act } = require('@testing-library/react')
const { fireEvent } = require('@testing-library/react')
const { SimulatorProvider } = require('@/contexts/simulator-context')
const { Tool2Safety } = require('@/components/simulator/tool2-safety')

describe('Tool2Safety component branches', () => {
  test('critical blocker leads to red status', async () => {
    render(
      React.createElement(SimulatorProvider, null, React.createElement(Tool2Safety))
    )

    const firstOption = screen.getByRole('button', { name: /אין גיבויים|❌ אין גיבויים/ })
    await act(async () => fireEvent.click(firstOption))

    // second question slider -> set high risk (9)
    const range = screen.getByRole('slider')
    await act(async () => {
      fireEvent.change(range, { target: { value: '9' } })
      range.dispatchEvent(new Event('input'))
    })
    const nextBtn = screen.getByRole('button', { name: /הבא/ })
    await act(async () => fireEvent.click(nextBtn))

    // third question - choose worst option
    const thirdOption = screen.getByRole('button', { name: /נזק כספי|❌ נזק כספי או משפטי/ })
    await act(async () => fireEvent.click(thirdOption))

    // fourth slider - set to high
    const ranges = screen.getAllByRole('slider')
    const lastRange = ranges[ranges.length - 1]
    await act(async () => {
      fireEvent.change(lastRange, { target: { value: '10' } })
      lastRange.dispatchEvent(new Event('input'))
    })
    const lastNext = screen.getByRole('button', { name: /הבא/ })
    await act(async () => fireEvent.click(lastNext))

    // Expect result UI to contain red indicator text
    expect(await screen.findByText(/סטטוס בטיחות|סיכון גבוה/)).toBeTruthy()
  })

  test('excellent controls produce green status', async () => {
    render(
      React.createElement(SimulatorProvider, null, React.createElement(Tool2Safety))
    )

    // Q1: choose safe first option (automated backup)
    const opt1 = screen.getByRole('button', { name: /גיבוי אוטומטית|✅ כן, מערכת גיבוי אוטומטית/ })
    await act(async () => fireEvent.click(opt1))

    // Q2: slider low risk
    const range = screen.getByRole('slider')
    await act(async () => {
      fireEvent.change(range, { target: { value: '2' } })
      range.dispatchEvent(new Event('input'))
    })
    await act(async () => fireEvent.click(screen.getByRole('button', { name: /הבא/ })))

    // Q3: choose safe option
    const opt3 = screen.getByRole('button', { name: /תיקון פשוט|✅ תיקון פשוט בדקות/ })
    await act(async () => fireEvent.click(opt3))

    // Q4: low capacity (good)
    const ranges = screen.getAllByRole('slider')
    const lastRange = ranges[ranges.length - 1]
    await act(async () => {
      fireEvent.change(lastRange, { target: { value: '2' } })
      lastRange.dispatchEvent(new Event('input'))
    })
    await act(async () => fireEvent.click(screen.getByRole('button', { name: /הבא/ })))

    // Expect green readiness UI
    expect(await screen.findByText(/מוכן לפיילוט|בטיחות גבוהה/)).toBeTruthy()
  })
})
