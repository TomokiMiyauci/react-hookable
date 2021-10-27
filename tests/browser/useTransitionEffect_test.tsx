import { render, fireEvent } from '@testing-library/react'
import { useRef } from 'react'

import { useTransitionEffect } from '@/useTransitionEffect'

const enterFrom = 'enterFrom'
const enter = 'enter'
const enterTo = 'enterTo'

describe('useTransitionEffect', () => {
  it('should no effect when not provide class name', () => {
    const testId = 'target'
    const Test = (): JSX.Element => {
      const target = useRef<HTMLDivElement>(null)
      useTransitionEffect({
        target
      })
      return (
        <div data-testid={testId} ref={target}>
          test
        </div>
      )
    }

    const { getByTestId } = render(<Test />)

    expect(getByTestId(testId)).not.toHaveClass()
  })

  it('should have enter and enterTo className when mount', () => {
    const testId = 'target'
    const Test = (): JSX.Element => {
      const target = useRef<HTMLDivElement>(null)
      useTransitionEffect({
        target,
        enterFrom,
        enter,
        enterTo
      })
      return (
        <div data-testid={testId} ref={target}>
          test
        </div>
      )
    }

    const { getByTestId } = render(<Test />)

    expect(getByTestId(testId)).toHaveClass(enter, enterTo)
  })

  it('should merge className and transition className', () => {
    const testId = 'target'
    const Test = (): JSX.Element => {
      const target = useRef<HTMLDivElement>(null)
      useTransitionEffect({
        target,
        enterFrom,
        enter,
        enterTo
      })
      return (
        <div
          className="enter enterFrom enterTo"
          data-testid={testId}
          ref={target}
        >
          test
        </div>
      )
    }

    const { getByTestId } = render(<Test />)

    fireEvent(getByTestId(testId), new Event('transitionend'))

    expect(getByTestId(testId)).toHaveClass(enterFrom, enterTo, enter)
  })

  it('should have enter className when mount', () => {
    const testId = 'target'
    const Test = (): JSX.Element => {
      const target = useRef<HTMLDivElement>(null)
      useTransitionEffect({
        target,
        enterFrom,
        enter,
        enterTo
      })
      return (
        <div data-testid={testId} ref={target}>
          test
        </div>
      )
    }

    const { getByTestId } = render(<Test />)

    fireEvent(getByTestId(testId), new Event('transitionend'))

    expect(getByTestId(testId)).not.toHaveClass()
  })
})
