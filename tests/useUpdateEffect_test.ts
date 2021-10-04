import { renderHook } from '@testing-library/react-hooks'

import { useIsFirstMount, useUpdateEffect } from '@/useUpdateEffect'

describe('useIsFirstMount', () => {
  it('should be defined', () => {
    expect(useIsFirstMount).toBeDefined()
  })

  it('should return Boolean', () => {
    const { result } = renderHook(() => useIsFirstMount())

    expect(result.current).toEqual(expect.any(Boolean))
  })

  it('should return true when the first render then return false', () => {
    const { result, rerender } = renderHook(() => useIsFirstMount())

    expect(result.current).toBeTruthy()
    rerender()
    expect(result.current).toBeFalsy()
    rerender()
    expect(result.current).toBeFalsy()
  })
})

describe('useUpdateEffect', () => {
  it('should be defined', () => {
    expect(useUpdateEffect).toBeDefined()
  })

  it('should call effect when deps is empty', () => {
    const effect = jest.fn()
    const { rerender } = renderHook(() => useUpdateEffect(effect))

    expect(effect).not.toBeCalled()
    rerender()

    expect(effect).toBeCalledTimes(1)
  })

  it('should call effect when update the hooks', async () => {
    const effect = jest.fn()
    const { rerender } = renderHook(
      ({ state }) => useUpdateEffect(effect, [state]),
      {
        initialProps: {
          state: false
        }
      }
    )

    expect(effect).not.toBeCalled()
    rerender({ state: true })

    expect(effect).toBeCalledTimes(1)
  })
})
