import { renderHook } from '@testing-library/react-hooks'

import { useIdleCallbackEffect } from '@/useIdleCallbackEffect'

describe('useIdleCallbackEffect', () => {
  it('should be defined', () => expect(useIdleCallbackEffect).toBeDefined())

  it('should call fallback instead of callback when requestIdleCallback is not supported', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    const fallback = jest.fn()

    renderHook(() =>
      useIdleCallbackEffect({
        callback,
        fallback
      })
    )

    expect(callback).not.toHaveBeenCalled()
    expect(fallback).toHaveBeenCalledTimes(1)
    expect(fallback).toHaveBeenCalledWith()
    jest.advanceTimersToNextTimer()
    expect(callback).not.toHaveBeenCalled()
    expect(fallback).toHaveBeenCalledTimes(1)
  })

  it('should call callback when requestIdleCallback is supported', () => {
    jest.useFakeTimers()
    global.requestIdleCallback = jest
      .fn()
      .mockImplementation((callback) => setTimeout(callback, 0))

    const callback = jest.fn()
    const fallback = jest.fn()

    renderHook(() =>
      useIdleCallbackEffect({
        callback,
        fallback
      })
    )

    expect(callback).not.toHaveBeenCalled()
    expect(fallback).not.toHaveBeenCalled()

    jest.runAllTimers()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
