import { renderHook } from '@testing-library/react-hooks/server'

import { useAnimationFrameEffect } from '@/useAnimationFrameEffect'

describe('useAnimationFrameEffect', () => {
  it('should not throw error', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useAnimationFrameEffect({
        callback
      })
    )

    expect(result.error).toBeUndefined()
    expect(callback).not.toHaveBeenCalled()
  })
})
