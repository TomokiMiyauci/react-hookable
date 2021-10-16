import { renderHook } from '@testing-library/react-hooks/server'

import { useEventListenerEffect } from '@/useEventListenerEffect'

describe('useEventListenerEffect', () => {
  it('should not throw error', () => {
    const listener = jest.fn()
    const { result } = renderHook(() =>
      useEventListenerEffect(
        {
          target: () => window,
          type: 'abort',
          listener
        },
        []
      )
    )

    expect(result.error).toBeUndefined()
  })
})
