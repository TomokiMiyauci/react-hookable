import { act, renderHook } from '@testing-library/react-hooks'

import { useWait } from '@/useWait'
describe('useWait', () => {
  it('should be defined', () => expect(useWait).toBeDefined())

  it('should wait', async () => {
    const fn = jest.fn()
    const { result } = renderHook(() => useWait())

    expect(result.current._ref.current).toHaveLength(0)
    await act(async () => {
      await result.current.use(1)
      fn()
    })

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should clean up when unmount', () => {
    jest.useFakeTimers()
    const { result, unmount } = renderHook(() => useWait())

    expect(result.current._ref.current).toHaveLength(0)
    act(() => {
      result.current.use(1000)
    })

    expect(result.current._ref.current).toHaveLength(1)

    unmount()
    expect(result.current._ref.current).toHaveLength(0)
  })

  it('should not call after unmount', () => {
    const fn = jest.fn()
    const { result, unmount } = renderHook(() => useWait())

    expect(result.current._ref.current).toHaveLength(0)
    act(async () => {
      await result.current.use(0)
      fn()
    })

    expect(fn).not.toHaveBeenCalled()
    unmount()
    expect(fn).not.toHaveBeenCalled()
  })
})
