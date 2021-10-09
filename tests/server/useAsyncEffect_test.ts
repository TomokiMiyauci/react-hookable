import { renderHook } from '@testing-library/react-hooks/server'

import { useAsyncEffect } from '@/useAsyncEffect'

describe('useAsyncEffect', () => {
  it('should not throw error', () => {
    const effect = jest.fn()
    const { result } = renderHook(() => useAsyncEffect(effect))
    expect(effect).not.toHaveBeenCalled()
    expect(result.error).toBeUndefined()
    expect(result.current).toBeUndefined()
  })
})
