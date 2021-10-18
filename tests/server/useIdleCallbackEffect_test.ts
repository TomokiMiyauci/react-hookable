import { renderHook } from '@testing-library/react-hooks/server'

import { useIdleCallbackEffect } from '@/useIdleCallbackEffect'

describe('useIdleCallbackEffect', () => {
  it('should not throw error', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useIdleCallbackEffect({
        callback
      })
    )

    expect(result.error).toBeUndefined()
  })
})
