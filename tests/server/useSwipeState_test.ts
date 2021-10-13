import { act, renderHook } from '@testing-library/react-hooks/server'

import { useSwipeState } from '@/useSwipeState'

describe('useSwipeState', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useSwipeState())

    expect(result.error).toBeUndefined()
  })

  it('should throw error when call use', () => {
    const { result } = renderHook(() => useSwipeState())

    act(() => {
      expect(() => result.current[1].use({} as never)).toThrowError()
    })
  })
})
