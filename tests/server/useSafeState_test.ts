import { renderHook } from '@testing-library/react-hooks/server'

import { useSafeState } from '@/useSafeState'

describe('useSafeState', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useSafeState())

    expect(result.error).toBeUndefined()
  })
})
