/** @jest-environment jsdom */
const React = require('react')
const { render, screen, act } = require('@testing-library/react')
const { SimulatorProvider, useSimulator } = require('@/contexts/simulator-context')

function TestConsumer() {
  const { tool1Data, setTool1Data, resetSimulator, currentTool, setCurrentTool } = useSimulator()

  return (
    React.createElement('div', null,
      React.createElement('div', { 'data-testid': 'current-tool' }, currentTool),
      React.createElement('div', { 'data-testid': 'tool1-score' }, tool1Data ? tool1Data.score : 'null'),
      React.createElement('button', { onClick: () => setTool1Data({ q1: 0, q2: 0, q3: 0, q4: 0, score: 7 }) }, 'set-tool1'),
      React.createElement('button', { onClick: () => setCurrentTool(2) }, 'set-tool-2'),
      React.createElement('button', { onClick: () => resetSimulator() }, 'reset')
    )
  )
}

describe('SimulatorContext', () => {
  test('provides and updates context values safely', () => {
    render(
      React.createElement(SimulatorProvider, null, React.createElement(TestConsumer))
    )

    const currentTool = screen.getByTestId('current-tool')
    const score = screen.getByTestId('tool1-score')

    expect(currentTool.textContent).toBe('1')
    expect(score.textContent).toBe('null')

    const setBtn = screen.getByText('set-tool1')
    act(() => setBtn.click())

    expect(screen.getByTestId('tool1-score').textContent).toBe('7')

    const setTool2 = screen.getByText('set-tool-2')
    act(() => setTool2.click())
    expect(screen.getByTestId('current-tool').textContent).toBe('2')

    const resetBtn = screen.getByText('reset')
    act(() => resetBtn.click())
    expect(screen.getByTestId('current-tool').textContent).toBe('1')
    expect(screen.getByTestId('tool1-score').textContent).toBe('null')
  })
})
