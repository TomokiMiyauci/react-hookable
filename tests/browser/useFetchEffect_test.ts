import { renderHook } from '@testing-library/react-hooks'

import { useFetchEffect } from '@/useFetchEffect'

describe('useFetchEffect', () => {
  it('should be defined', () => expect(useFetchEffect).toBeDefined())

  it('should call onResolve', async () => {
    const mockFetch = jest.fn()
    global.fetch = mockFetch

    mockFetch.mockResolvedValue({})
    const onResolve = jest.fn()
    const { waitFor } = renderHook(() =>
      useFetchEffect({
        input: '',
        onResolve
      })
    )

    await waitFor(() => onResolve.mock.calls.length > 0)

    expect(onResolve).toHaveBeenCalledTimes(1)
    expect(onResolve).toHaveBeenCalledWith({})
  })

  it('should call onReject when catch promise', async () => {
    const mockFetch = jest.fn()
    global.fetch = mockFetch

    mockFetch.mockRejectedValue(Error())
    const onReject = jest.fn()
    const onAbort = jest.fn()

    const { waitFor } = renderHook(() =>
      useFetchEffect({
        input: '',
        onReject,
        onAbort
      })
    )
    expect(onReject).not.toHaveBeenCalled()
    expect(onAbort).not.toHaveBeenCalled()

    await waitFor(() => onReject.mock.calls.length > 0)

    expect(onAbort).not.toHaveBeenCalled()
    expect(onReject).toHaveBeenCalledTimes(1)
    expect(onReject).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should call onAbort when catch promise and error name is AbortError', async () => {
    const mockFetch = jest.fn()
    global.fetch = mockFetch

    const abortError = new Error()
    abortError.name = 'AbortError'

    mockFetch.mockRejectedValue(abortError)
    const onReject = jest.fn()
    const onAbort = jest.fn()
    const { waitFor } = renderHook(() =>
      useFetchEffect({
        input: '',
        onReject,
        onAbort
      })
    )
    expect(onReject).not.toHaveBeenCalled()
    expect(onAbort).not.toHaveBeenCalled()

    await waitFor(() => onAbort.mock.calls.length > 0)

    expect(onReject).not.toHaveBeenCalled()

    expect(onAbort).toHaveBeenCalledTimes(1)
    expect(onAbort).toHaveBeenCalledWith(abortError)
  })

  it('should call onFinally after all promise', async () => {
    const mockFetch = jest.fn()
    global.fetch = mockFetch

    mockFetch.mockResolvedValue({})
    const onResolve = jest.fn()
    const onFinally = jest.fn()
    const { waitFor } = renderHook(() =>
      useFetchEffect({
        input: '',
        onResolve,
        onFinally
      })
    )
    expect(onResolve).not.toHaveBeenCalled()
    expect(onFinally).not.toHaveBeenCalled()

    await waitFor(() => onFinally.mock.calls.length > 0)

    expect(onResolve).toHaveBeenCalledTimes(1)
    expect(onFinally).toHaveBeenCalledTimes(1)
  })
})
