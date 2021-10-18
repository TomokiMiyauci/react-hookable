import { renderHook } from '@testing-library/react-hooks'

import { useIntervalEffect } from '@/useIntervalEffect'

describe('useIntervalEffect', () => {
  it('should be defined', () => expect(useIntervalEffect).toBeDefined())

  it('should set interval timer', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    renderHook(() =>
      useIntervalEffect({
        callback
      })
    )

    expect(callback).not.toHaveBeenCalled()
    jest.advanceTimersToNextTimer()
    expect(callback).toHaveBeenCalledTimes(1)
    jest.advanceTimersToNextTimer()
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should clear interval timer when unmount', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    const { unmount } = renderHook(() =>
      useIntervalEffect({
        callback
      })
    )

    expect(callback).not.toHaveBeenCalled()
    unmount()
    jest.advanceTimersToNextTimer()
    expect(callback).not.toHaveBeenCalled()
  })
})
