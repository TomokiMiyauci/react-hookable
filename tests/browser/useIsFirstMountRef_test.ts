import { renderHook } from '@testing-library/react-hooks'

import { useIsFirstMountRef } from '@/useIsFirstMountRef'

describe('useIsFirstMountRef', () => {
  it('should be defined', () => expect(useIsFirstMountRef).toBeDefined())

  it('should return true when first mount', () => {
    const { result, rerender } = renderHook(() => useIsFirstMountRef())

    expect(result.current.isFirstMount).toBeTruthy()
    rerender()
    expect(result.current.isFirstMount).toBeFalsy()
    rerender()
    expect(result.current.isFirstMount).toBeFalsy()
  })
})
