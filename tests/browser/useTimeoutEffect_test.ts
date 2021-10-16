import { renderHook } from '@testing-library/react-hooks'

import { useTimeoutEffect } from '@/useTimeoutEffect'

describe('useTimeoutEffect', () => {
  it('should be defined', () => expect(useTimeoutEffect).toBeDefined())

  it('should call callback', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    renderHook(() =>
      useTimeoutEffect({
        callback
      })
    )

    expect(callback).not.toHaveBeenCalled()
    jest.runAllTimers()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should call after 1000 ms', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    renderHook(() =>
      useTimeoutEffect({
        callback,
        ms: 1000
      })
    )

    expect(callback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(999)
    expect(callback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should clear timer when unmount', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    const { unmount } = renderHook(() =>
      useTimeoutEffect({
        callback,
        ms: 1000
      })
    )

    expect(callback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(999)
    expect(callback).not.toHaveBeenCalled()

    unmount()
    jest.runAllTimers()
    expect(callback).not.toHaveBeenCalled()
  })
})
