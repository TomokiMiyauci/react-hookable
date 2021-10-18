import { renderHook } from '@testing-library/react-hooks'

import { useAnimationFrameEffect } from '@/useAnimationFrameEffect'

describe('useAnimationFrameEffect', () => {
  it('should be defined', () => expect(useAnimationFrameEffect).toBeDefined())

  it('should request animation frame', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    renderHook(() =>
      useAnimationFrameEffect({
        callback
      })
    )

    expect(callback).not.toHaveBeenCalled()

    jest.runAllTimers()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(expect.any(Number))
  })

  it('should clear animation frame when unmount', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    const { unmount } = renderHook(() =>
      useAnimationFrameEffect({
        callback
      })
    )

    expect(callback).not.toHaveBeenCalled()
    unmount()

    jest.runAllTimers()

    expect(callback).not.toHaveBeenCalled()
  })
})
