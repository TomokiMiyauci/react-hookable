import { act, renderHook } from '@testing-library/react-hooks'

import { useTimeout } from '@/useTimeout'

describe('useTimeout', () => {
  beforeAll(() => jest.useFakeTimers())
  it('should be defined', () => expect(useTimeout).toBeDefined())

  it('should set timer when add function has executed', () => {
    const { result } = renderHook(() => useTimeout())

    expect(result.current[0].current).toHaveLength(0)
    const invoke = jest.fn()
    act(() => {
      result.current[1].add(invoke, 1000)
    })

    expect(invoke).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1000)
    expect(invoke).toHaveBeenCalledTimes(1)
    expect(result.current[0].current).toHaveLength(1)
  })

  it('should clear timer when clear function has executed', () => {
    const { result } = renderHook(() => useTimeout())

    const invoke = jest.fn()
    act(() => {
      result.current[1].add(invoke, 1)
    })

    jest.advanceTimersByTime(1)
    expect(invoke).toHaveBeenCalledTimes(1)
    expect(result.current[0].current).toHaveLength(1)
  })

  it('should clear timer automatically when unmounted and default options', () => {
    const { result, unmount } = renderHook(() => useTimeout())

    expect(result.current[0].current).toHaveLength(0)

    const invoke = jest.fn()
    act(() => {
      result.current[1].add(invoke, 1)
    })

    jest.runAllTimers()
    expect(result.current[0].current).toHaveLength(1)
    unmount()
    expect(result.current[0].current).toHaveLength(0)
  })

  it('should not clear timer automatically when unmounted and pass options', () => {
    const { result, unmount } = renderHook(() =>
      useTimeout({ clearAuto: false })
    )

    expect(result.current[0].current).toHaveLength(0)

    const invoke = jest.fn()
    act(() => {
      result.current[1].add(invoke, 1)
    })

    jest.runAllTimers()
    expect(result.current[0].current).toHaveLength(1)
    unmount()
    expect(result.current[0].current).toHaveLength(1)
  })

  it('should stack timer when add function call multiple', () => {
    const { result, unmount } = renderHook(() => useTimeout())

    expect(result.current[0].current).toHaveLength(0)

    const invoke = jest.fn()
    act(() => {
      result.current[1].add(invoke, 1)
      result.current[1].add(invoke, 2)
      result.current[1].add(invoke, 3)
    })

    jest.runAllTimers()
    expect(result.current[0].current).toHaveLength(3)
    unmount()
    expect(result.current[0].current).toHaveLength(0)
  })
})
