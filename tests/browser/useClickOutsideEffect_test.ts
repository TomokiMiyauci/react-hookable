import { renderHook, act } from '@testing-library/react-hooks'
import { createRef } from 'react'

import { useClickOutsideEffect } from '@/useClickOutsideEffect'

describe('useClickOutsideEffect', () => {
  it('should be defined', () => expect(useClickOutsideEffect).toBeDefined())

  it('should call onClickOutside when click out of target', () => {
    const target = document.createElement('div')
    const onClickOutside = jest.fn()
    const onClickInside = jest.fn()

    renderHook(() =>
      useClickOutsideEffect({
        target,
        onClickOutside,
        onClickInside
      })
    )

    expect(onClickOutside).not.toHaveBeenCalled()
    expect(onClickInside).not.toHaveBeenCalled()

    act(() => {
      document.dispatchEvent(new Event('click'))
    })

    expect(onClickOutside).toHaveBeenCalledTimes(1)
    expect(onClickInside).not.toHaveBeenCalled()
  })

  it('should not call when target is undefined', () => {
    const target = createRef<HTMLElement>()
    const onClickOutside = jest.fn()
    const onClickInside = jest.fn()

    renderHook(() =>
      useClickOutsideEffect({
        target,
        onClickOutside,
        onClickInside
      })
    )

    expect(onClickOutside).not.toHaveBeenCalled()
    expect(onClickInside).not.toHaveBeenCalled()

    act(() => {
      const ev = Object.defineProperty(new Event('click'), 'target', {
        value: target
      })
      document.dispatchEvent(ev)
    })

    expect(onClickOutside).not.toHaveBeenCalled()
    expect(onClickInside).not.toHaveBeenCalled()
  })

  it('should call onClickInside when click inside of target', () => {
    const target = document.createElement('div')
    const onClickOutside = jest.fn()
    const onClickInside = jest.fn()

    renderHook(() =>
      useClickOutsideEffect({
        target,
        onClickOutside,
        onClickInside
      })
    )

    expect(onClickOutside).not.toHaveBeenCalled()
    expect(onClickInside).not.toHaveBeenCalled()

    act(() => {
      const ev = Object.defineProperty(new Event('click'), 'target', {
        value: target
      })
      document.dispatchEvent(ev)
    })

    expect(onClickOutside).not.toHaveBeenCalled()
    expect(onClickInside).toHaveBeenCalledTimes(1)
  })

  it('should switch events to touchstart', () => {
    const target = document.createElement('div')
    const onClickOutside = jest.fn()
    const onClickInside = jest.fn()

    renderHook(() =>
      useClickOutsideEffect({
        target,
        onClickOutside,
        onClickInside,
        events: ['touchstart']
      })
    )

    expect(onClickOutside).not.toHaveBeenCalled()
    expect(onClickInside).not.toHaveBeenCalled()

    act(() => {
      document.dispatchEvent(new Event('click'))
    })

    expect(onClickOutside).not.toHaveBeenCalled()
    expect(onClickInside).not.toHaveBeenCalled()

    act(() => {
      document.dispatchEvent(new Event('touchstart'))
    })

    expect(onClickOutside).toHaveBeenCalledTimes(1)
    expect(onClickInside).not.toHaveBeenCalled()
  })
})
