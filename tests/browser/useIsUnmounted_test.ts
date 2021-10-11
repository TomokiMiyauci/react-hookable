import { renderHook } from '@testing-library/react-hooks'

import { useIsUnmounted } from '@/useIsUnmounted'

describe('useUnmounted', () => {
  it('should be defined', () => expect(useIsUnmounted).toBeDefined())

  it('should be false when unmount', () => {
    const { result, unmount } = renderHook(() => useIsUnmounted())

    expect(result.current.current).toBeFalsy()

    unmount()
    expect(result.current.current).toBeTruthy()
  })
})
