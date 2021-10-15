import { act, renderHook } from '@testing-library/react-hooks'
import { createRef } from 'react'

import { useTouchEffect } from '@/useTouchEffect'

describe('useTouchEffect', () => {
  it('should be defined', () => expect(useTouchEffect).toBeDefined())

  it('should fire right event', () => {
    const onTouchStart = jest.fn()
    const onTouchMove = jest.fn()
    const onTouchEnd = jest.fn()
    renderHook(() =>
      useTouchEffect(
        { target: window, onTouchStart, onTouchMove, onTouchEnd },
        []
      )
    )

    expect(onTouchStart).not.toHaveBeenCalled()
    expect(onTouchMove).not.toHaveBeenCalled()
    expect(onTouchEnd).not.toHaveBeenCalled()

    act(() => {
      window.dispatchEvent(new TouchEvent('touchstart'))
      window.dispatchEvent(new TouchEvent('touchmove'))
      window.dispatchEvent(new TouchEvent('touchend'))
    })

    expect(onTouchStart).toHaveBeenCalledTimes(1)
    expect(onTouchMove).toHaveBeenCalledTimes(1)
    expect(onTouchEnd).toHaveBeenCalledTimes(1)
  })

  it('should accept ref at target', () => {
    const onTouchStart = jest.fn()
    const target = createRef<HTMLElement>()

    renderHook(() => useTouchEffect({ target, onTouchStart }, []))

    expect(onTouchStart).not.toHaveBeenCalled()

    act(() => {
      window.dispatchEvent(new TouchEvent('touchstart'))
    })

    expect(onTouchStart).not.toHaveBeenCalled()
  })
})
