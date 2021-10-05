import { act, renderHook } from '@testing-library/react-hooks'

import { useDebounce } from '@/useDebounce'
describe('useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  it('should be defined', () => expect(useDebounce).toBeDefined())

  it('should execute after 1000 millisecond', () => {
    const { result } = renderHook(() => useDebounce())

    const invoke = jest.fn()

    expect(invoke).not.toHaveBeenCalled()
    act(() => {
      result.current(invoke, 1000)
    })
    expect(invoke).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1000)
    expect(invoke).toHaveBeenCalledTimes(1)
    jest.runAllTicks()
    expect(invoke).toHaveBeenCalledTimes(1)
  })

  it('should call only once when debounced function calls many times', () => {
    const { result } = renderHook(() => useDebounce())

    const invoke = jest.fn()
    expect(invoke).not.toHaveBeenCalled()

    act(() => {
      result.current(invoke, 100)
      result.current(invoke, 100)
      result.current(invoke, 100)
    })
    expect(invoke).not.toHaveBeenCalled()
    jest.advanceTimersByTime(100)
    expect(invoke).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(200)
    expect(invoke).toHaveBeenCalledTimes(1)
    jest.runAllTicks()
    expect(invoke).toHaveBeenCalledTimes(1)
  })

  it('should call last one when debounced function calls many times', () => {
    const { result } = renderHook(() => useDebounce())

    const invoke1 = jest.fn()
    const invoke2 = jest.fn()
    const invoke3 = jest.fn()

    act(() => {
      result.current(invoke1, 100)
      result.current(invoke2, 100)
      result.current(invoke3, 100)
    })
    expect(invoke1).not.toHaveBeenCalled()
    expect(invoke2).not.toHaveBeenCalled()
    expect(invoke3).not.toHaveBeenCalled()

    jest.advanceTimersByTime(100)
    expect(invoke1).not.toHaveBeenCalled()
    expect(invoke2).not.toHaveBeenCalled()
    expect(invoke3).toHaveBeenCalledTimes(1)

    jest.runAllTicks()
    expect(invoke1).not.toHaveBeenCalled()
    expect(invoke2).not.toHaveBeenCalled()
    expect(invoke3).toHaveBeenCalledTimes(1)
  })
})
