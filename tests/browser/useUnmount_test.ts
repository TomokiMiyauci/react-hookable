import { act, renderHook } from '@testing-library/react-hooks'

import { useUnmount } from '@/useUnmount'

describe('useUnmount', () => {
  it('should call functions when unmounted', () => {
    const { result, unmount } = renderHook(() => useUnmount())

    const fn = jest.fn()

    act(() => {
      result.current.use(fn)
    })

    expect(fn).not.toHaveBeenCalled()
    expect(result.current._ref.current).toHaveLength(1)
    unmount()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(result.current._ref.current).toHaveLength(0)
  })

  it('should call functions by order', () => {
    const { result, unmount } = renderHook(() => useUnmount())

    const fn = jest.fn().mockReturnValueOnce(true)

    act(() => {
      result.current.use(fn)
      result.current.use(fn)
    })

    expect(fn).not.toHaveBeenCalled()
    expect(result.current._ref.current).toHaveLength(2)
    unmount()
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn.mock.results).toEqual([
      { type: 'return', value: true },
      { type: 'return', value: undefined }
    ])
  })

  it('should not call fn after call disuse', () => {
    const { result, unmount } = renderHook(() => useUnmount())

    const fn = jest.fn()

    act(() => {
      result.current.use(fn)
      result.current.use(fn)
    })

    expect(fn).not.toHaveBeenCalled()
    expect(result.current._ref.current).toHaveLength(2)

    act(result.current.disuse)
    expect(result.current._ref.current).toHaveLength(0)

    unmount()
    expect(fn).not.toHaveBeenCalled()
  })

  it('should call fn after call disuse then call use', () => {
    const { result, unmount } = renderHook(() => useUnmount())

    const fn = jest.fn()

    act(() => {
      result.current.use(fn)
    })

    expect(fn).not.toHaveBeenCalled()
    expect(result.current._ref.current).toHaveLength(1)

    act(result.current.disuse)
    expect(result.current._ref.current).toHaveLength(0)

    act(() => {
      result.current.use(fn)
    })

    unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
