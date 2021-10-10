import { act, renderHook } from '@testing-library/react-hooks'

import { useSequenceState } from '@/useSequenceState'

describe('useSequenceState', () => {
  it('should be defined', () => expect(useSequenceState).toBeDefined())

  it('should be true when processing function', async () => {
    const { result } = renderHook(() => useSequenceState())

    expect(result.current[0]).toBeFalsy()
    const fn = jest.fn()
    expect(fn).not.toHaveBeenCalled()

    act(() => {
      result.current[1](fn)
    })

    expect(result.current[0]).toBeTruthy()
    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      result.current[1](fn)
    })

    expect(result.current[0]).toBeFalsy()
  })

  it('should call sequentially', async () => {
    const { result } = renderHook(() => useSequenceState())

    expect(result.current[0]).toBeFalsy()
    const fn = jest.fn().mockReturnValueOnce(true)
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current[1](fn)
    })

    await act(async () => {
      result.current[1](fn)
    })

    expect(result.current[0]).toBeFalsy()
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn.mock.results[0].value).toBeTruthy()
    expect(fn.mock.results[1].value).toBeUndefined()
  })
})
