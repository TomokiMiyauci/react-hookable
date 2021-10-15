import { renderHook } from '@testing-library/react-hooks/server'

import { useSwipeEffectState } from '@/useSwipeEffectState'

describe('useSwipeEffectState', () => {
  it('should throw error', () => {
    const { result } = renderHook(() =>
      useSwipeEffectState({ target: window }, [])
    )

    expect(result.error).toEqual(expect.any(Error))
  })
})
