import { renderHook } from '@testing-library/react-hooks/server'

import { useTimeoutEffect } from '@/useTimeoutEffect'

describe('useTimeoutEffect', () => {
  it('should not throw error', () => {
    const callback = jest.fn()
    const { result } = renderHook(() =>
      useTimeoutEffect(
        {
          callback
        },
        []
      )
    )

    expect(result.error).toBeUndefined()
  })
})
