import { renderHook } from '@testing-library/react-hooks/server'

import { useWindowScrollEffectState } from '@/useWindowScrollEffectState'

describe('useWindowScrollEffectState', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useWindowScrollEffectState())

    expect(result.error).toBeUndefined()
  })
})
