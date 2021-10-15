import { renderHook } from '@testing-library/react-hooks/server'

import { useConditionalEffect } from '@/useConditionalEffect'

describe('useConditionalEffect', () => {
  it('should not throw error', () => {
    const effect = jest.fn()
    const { result } = renderHook(() =>
      useConditionalEffect(effect, [], () => true)
    )

    expect(result.error).toBeUndefined()
  })
})
