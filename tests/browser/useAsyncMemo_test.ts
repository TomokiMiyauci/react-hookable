/* eslint-disable @typescript-eslint/no-empty-function */
import { act, renderHook } from '@testing-library/react-hooks'

import { useAsyncMemo } from '@/useAsyncMemo'

describe('useAsyncMemo', () => {
  it('should be defined', () => expect(useAsyncMemo).toBeDefined())

  it('should return initial value as undefined', () => {
    const { result, unmount } = renderHook(() => useAsyncMemo(async () => true))

    expect(result.current).toBeUndefined()
    act(() => unmount())
    expect(result.current).toBeUndefined()
  })

  it('should return initial state as custom', () => {
    const { result, unmount } = renderHook(() =>
      useAsyncMemo(async () => true, [], 1)
    )
    expect(result.current).toBe(1)
    act(() => unmount())
    expect(result.current).toBe(1)
  })

  it('should return factory return value', async () => {
    const factory = jest.fn().mockResolvedValue(true)
    const { result } = renderHook(() => useAsyncMemo(factory))

    expect(result.current).toBeUndefined()

    await act(async () => {})
    expect(result.current).toBe(true)
    expect(factory).toHaveBeenCalledTimes(2)
  })
})
