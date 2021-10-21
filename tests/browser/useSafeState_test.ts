import { act, renderHook } from '@testing-library/react-hooks'

import { useSafeState } from '@/useSafeState'

describe('useSafeState', () => {
  it('should be defined', () => expect(useSafeState).toBeDefined())

  it('should be undefined when args do not pass', () => {
    const { result } = renderHook(() => useSafeState())

    expect(result.current[0]).toBeUndefined()
    expect(result.current[1]).toEqual(expect.any(Function))
  })

  it('should not update when unmount', () => {
    const { result, unmount } = renderHook(() => useSafeState(1))

    expect(result.current[0]).toBe(1)
    unmount()
    act(() => {
      result.current[1](0)
    })
    expect(result.current[0]).toBe(1)
  })

  it('should equal 0 when args 0', () => {
    const { result } = renderHook(() => useSafeState(0))

    expect(result.current[0]).toBe(0)
  })

  it('should be 0 when args is () => 0', () => {
    const { result } = renderHook(() => useSafeState(() => 0))

    expect(result.current[0]).toBe(0)
  })

  it('should update state', () => {
    const { result } = renderHook(() => useSafeState(1))

    expect(result.current[0]).toBe(1)
    act(() => {
      result.current[1](0)
    })
    expect(result.current[0]).toBe(0)
  })
})
