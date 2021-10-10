import { act } from '@testing-library/react-hooks'
import { renderHook } from '@testing-library/react-hooks/server'

import { useWindowScrollState } from '@/useWindowScrollState'

describe('useScroll', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useWindowScrollState())

    expect(result.error).toBeUndefined()
  })

  it('should be initial state', () => {
    const { result } = renderHook(() => useWindowScrollState())

    expect(result.current[0].x).toBeUndefined()
    expect(result.current[0].y).toBeUndefined()
  })

  it('should throw error when call use or disuse', () => {
    const { result } = renderHook(() => useWindowScrollState())

    act(() => {
      expect(result.current[1].use).toThrowError('window is not defined')
      expect(result.current[1].disuse).not.toThrowError()
    })
  })
})
