import { act, renderHook } from '@testing-library/react-hooks'

import { useFetch } from '@/useFetch'

describe('useFetch', () => {
  it('should be defined', () => expect(useFetch).toBeDefined())

  it('should call fetch with args', () => {
    const fetch = jest.fn()
    global.fetch = fetch
    const { result } = renderHook(() => useFetch())

    act(() => {
      result.current.use('')
    })

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('', {
      signal: result.current._ref.current.signal
    })
  })

  it('should override RequestInit', () => {
    const fetch = jest.fn()
    global.fetch = fetch
    const { result } = renderHook(() => useFetch())

    act(() => {
      result.current.use('', { signal: undefined })
    })

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('', {
      signal: undefined
    })
  })

  it('should abort when unmount', () => {
    const fn = jest.fn()
    const fetch = jest.fn().mockResolvedValue(undefined)
    global.fetch = fetch
    const { result, unmount } = renderHook(() => useFetch())

    act(() => {
      result.current.use('').then(fn)
    })

    unmount()
    expect(fn).not.toHaveBeenCalled()
  })
})
