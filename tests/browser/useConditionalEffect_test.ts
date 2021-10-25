import { renderHook } from '@testing-library/react-hooks'

import { useConditionalEffect } from '@/useConditionalEffect'

describe('useConditionalEffect', () => {
  it('should be defined', () => expect(useConditionalEffect).toBeDefined())

  const table: [boolean | undefined, boolean][] = [
    [true, true],
    [false, false],
    [undefined, false]
  ]

  it.each(table)(
    'should not effect when condition is undefined or false',
    (condition, expected) => {
      const effect = jest.fn()
      const { rerender } = renderHook(() =>
        useConditionalEffect(effect, [], () => condition)
      )

      if (expected) {
        expect(effect).toHaveBeenCalledTimes(1)
      } else {
        expect(effect).not.toHaveBeenCalled()
      }

      rerender()
      if (expected) {
        expect(effect).toHaveBeenCalledTimes(1)
      } else {
        expect(effect).not.toHaveBeenCalled()
      }
    }
  )

  it('should not effect when condition is undefined or false', () => {
    const effect = jest.fn()
    const { rerender } = renderHook(
      ({ isShow }) => useConditionalEffect(effect, [isShow], () => isShow),
      {
        initialProps: {
          isShow: false
        }
      }
    )

    expect(effect).not.toHaveBeenCalled()

    rerender({ isShow: true })
    expect(effect).toHaveBeenCalledTimes(1)
    rerender({ isShow: false })
    expect(effect).toHaveBeenCalledTimes(1)
    rerender({ isShow: true })
    expect(effect).toHaveBeenCalledTimes(2)
  })

  it('should not effect when condition is undefined or false', () => {
    const effect = jest.fn()
    const { rerender } = renderHook(
      ({ a, b, c }) =>
        useConditionalEffect(effect, [a, b, c], () => a && b && c),
      {
        initialProps: {
          a: false,
          b: false,
          c: false
        }
      }
    )

    expect(effect).not.toHaveBeenCalled()
    rerender({ a: true, b: true, c: false })
    expect(effect).not.toHaveBeenCalled()
    rerender({ a: false, b: true, c: false })
    rerender({ a: true, b: true, c: true })
    expect(effect).toHaveBeenCalledTimes(1)
  })

  it('should effect when not pass condition', () => {
    const effect = jest.fn()
    const { rerender } = renderHook(
      ({ a }) => useConditionalEffect(effect, [a]),
      {
        initialProps: {
          a: false
        }
      }
    )

    expect(effect).toHaveBeenCalledTimes(1)
    rerender({ a: true })
    expect(effect).toHaveBeenCalledTimes(2)
  })

  it('should switch effect hook', () => {
    const effect = jest.fn()
    const effectHook = jest.fn()
    renderHook(() =>
      useConditionalEffect(effect, undefined, undefined, effectHook)
    )

    expect(effectHook).toHaveBeenCalledTimes(1)
  })
})
