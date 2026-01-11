/** @jest-environment jsdom */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { SimulatorProvider, useSimulator } from '@/contexts/simulator-context'

function TestConsumer() {
  const { tool1Data, setTool1Data, resetSimulator, currentTool, setCurrentTool } = useSimulator()

  return (
    <div>
      <div data-testid="current-tool">{currentTool}</div>
      <div data-testid="tool1-score">{tool1Data ? tool1Data.score : 'null'}</div>
      <button onClick={() => setTool1Data({ q1: 0, q2: 0, q3: 0, q4: 0, score: 7 })}>set-tool1</button>
      <button onClick={() => setCurrentTool(2)}>set-tool-2</button>
      <button onClick={() => resetSimulator()}>reset</button>
    </div>
  )
}

describe('SimulatorContext', () => {
  test('provides and updates context values safely', () => {
    render(
      <SimulatorProvider>
        <TestConsumer />
      </SimulatorProvider>
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
