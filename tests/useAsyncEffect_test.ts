/* eslint-disable @typescript-eslint/no-empty-function */
import { act, renderHook } from '@testing-library/react-hooks'

import { useAsyncEffect } from '@/useAsyncEffect'

describe('useAsyncEffect', () => {
  it('should call with async function', () => {
    const fn = jest.fn(async () => {})
    renderHook(() => useAsyncEffect(fn))

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
    expect.assertions(2)
  })

  it('should call destructor', async () => {
    const destructor = jest.fn()
    const fn = jest.fn(async () => destructor)
    const { unmount } = renderHook(() => useAsyncEffect(fn))

    await act(async () => {
      unmount()
    })
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(destructor).toHaveBeenCalled()
    expect(destructor).toHaveBeenCalledTimes(1)
    expect.assertions(4)
  })

  it('should re-effect change deps', async () => {
    const destructor = jest.fn()
    const fn = jest.fn(async () => destructor)
    const { rerender } = renderHook(
      ({ state }) => useAsyncEffect(fn, [state]),
      {
        initialProps: {
          state: false
        }
      }
    )

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(destructor).not.toHaveBeenCalled()

    rerender({
      state: true
    })
    expect(fn).toHaveBeenCalledTimes(2)
    expect(destructor).not.toHaveBeenCalled()
  })
})
