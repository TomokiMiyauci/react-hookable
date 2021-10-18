import { act, renderHook } from '@testing-library/react-hooks'

import { useWindowScrollEffectState } from '@/useWindowScrollEffectState'

describe('useWindowScrollEffectState', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollX', { value: 0 })
    Object.defineProperty(window, 'scrollY', { value: 0 })
  })
  it('should be defined', () =>
    expect(useWindowScrollEffectState).toBeDefined())

  it('should equal scrollX and scrollY to window.scrollX and window.scrollY', () => {
    const { result } = renderHook(() => useWindowScrollEffectState())

    expect(result.current['0'].scrollX).toBe(0)
    expect(result.current['0'].scrollY).toBe(0)

    const value = 100

    act(() => {
      Object.defineProperty(window, 'scrollX', { value })
      Object.defineProperty(window, 'scrollY', { value })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current['0'].scrollX).toBe(value)
    expect(result.current['0'].scrollY).toBe(value)
  })

  it('should return stateUpdater as {}', () => {
    const { result } = renderHook(() => useWindowScrollEffectState())

    expect(result.current['1']).toEqual({})
  })

  it('should clear auto when unmount', () => {
    const { result, unmount } = renderHook(() => useWindowScrollEffectState())

    expect(result.current['0'].scrollX).toBe(0)
    expect(result.current['0'].scrollY).toBe(0)
    unmount()
    const value = 100

    act(() => {
      Object.defineProperty(window, 'scrollX', { value })
      Object.defineProperty(window, 'scrollY', { value })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current['0'].scrollX).toBe(0)
    expect(result.current['0'].scrollY).toBe(0)
  })
})
