import { renderHook } from '@testing-library/react-hooks/server'

import { useWait } from '@/useWait'

describe('useWait', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useWait())

    expect(result.error).toBeUndefined()
  })
})

