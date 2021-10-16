import { renderHook } from '@testing-library/react-hooks/server'

import { useIsFirstMountRef } from '@/useIsFirstMountRef'

describe('useIsFirstMountRef', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useIsFirstMountRef())

    expect(result.error).toBeUndefined()
  })

  it('should always return true', () => {
    const { result } = renderHook(() => useIsFirstMountRef())

    expect(result.current.isFirstMount).toBeTruthy()
  })
})
