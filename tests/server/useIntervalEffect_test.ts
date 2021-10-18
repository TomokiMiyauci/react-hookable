import { renderHook } from '@testing-library/react-hooks/server'

import { useIntervalEffect } from '@/useIntervalEffect'

describe('useIntervalEffect', () => {
  it('should not throw error', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useIntervalEffect({
        callback
      })
    )

    expect(result.error).toBeUndefined()
  })
})
