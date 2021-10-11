import { renderHook } from '@testing-library/react-hooks/server'

import { useIsUnmounted } from '@/useIsUnmounted'

describe('useUnmounted', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useIsUnmounted())

    expect(result.error).toBeUndefined()
  })

  it('should be false when server side', () => {
    const { result, unmount } = renderHook(() => useIsUnmounted())

    expect(result.current.current).toBeFalsy()

    unmount()
    expect(result.current.current).toBeFalsy()
  })
})
