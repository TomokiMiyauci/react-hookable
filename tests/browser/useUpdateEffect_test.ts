import { renderHook } from '@testing-library/react-hooks'

import { useUpdateEffect } from '@/useUpdateEffect'

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
