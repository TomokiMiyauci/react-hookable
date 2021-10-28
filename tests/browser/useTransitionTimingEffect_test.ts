import { renderHook } from '@testing-library/react-hooks'
import { createRef } from 'react'
import { act } from 'react-dom/test-utils'

import { useTransitionTimingEffect } from '@/useTransitionTimingEffect'

describe('useTransitionTimingEffect', () => {
  it('should be defined', () => expect(useTransitionTimingEffect).toBeDefined())

  it('should call onBeforeEnter and onEnter only', () => {
    const onBeforeEnter = jest.fn()
    const onEnter = jest.fn()
    const onAfterEnter = jest.fn()
    const onBeforeLeave = jest.fn()
    const onLeave = jest.fn()
    const onAfterLeave = jest.fn()

    renderHook(() =>
      useTransitionTimingEffect({
        target: createRef(),
        onBeforeEnter,
        onEnter,
        onAfterEnter,
        onBeforeLeave,
        onLeave,
        onAfterLeave
      })
    )

    expect(onBeforeEnter).toHaveBeenCalledTimes(1)
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onAfterEnter).not.toHaveBeenCalled()
    expect(onBeforeLeave).not.toHaveBeenCalled()
    expect(onLeave).not.toHaveBeenCalled()
    expect(onAfterLeave).not.toHaveBeenCalled()
  })

  it('should call onBeforeEnter then onEnter', () => {
    const onBeforeEnter = jest.fn().mockReturnValueOnce(() => true)
    const onAfterEnter = jest.fn()

    renderHook(() =>
      useTransitionTimingEffect({
        target: createRef(),
        onBeforeEnter,
        onEnter: onBeforeEnter,
        onAfterEnter
      })
    )

    expect(onAfterEnter).not.toHaveBeenCalled()
    expect(onBeforeEnter).toHaveBeenCalledTimes(2)
    expect(onBeforeEnter.mock.results).toEqual([
      { type: 'return', value: expect.any(Function) },
      { type: 'return', value: undefined }
    ])
  })

  it('should call onAfterEnter when fire transitionend', () => {
    const onAfterEnter = jest.fn()

    const { unmount } = renderHook(() =>
      useTransitionTimingEffect({
        target: createRef(),
        onAfterEnter
      })
    )

    expect(onAfterEnter).not.toHaveBeenCalled()

    act(() => {
      dispatchEvent(new Event('transitionend'))
    })

    expect(onAfterEnter).not.toHaveBeenCalledTimes(1)
    unmount()

    act(() => {
      dispatchEvent(new Event('transitionend'))
    })

    expect(onAfterEnter).not.toHaveBeenCalledTimes(1)
  })

  it('should not call onBeforeLeave and onLeave when first render', () => {
    const onBeforeLeave = jest.fn()
    const onLeave = jest.fn()
    const onAfterLeave = jest.fn()

    const { rerender } = renderHook(
      ({ entered }) =>
        useTransitionTimingEffect({
          target: createRef(),
          entered,
          onBeforeLeave,
          onLeave,
          onAfterLeave
        }),
      {
        initialProps: {
          entered: true
        }
      }
    )

    expect(onBeforeLeave).not.toHaveBeenCalled()
    expect(onLeave).not.toHaveBeenCalled()
    expect(onAfterLeave).not.toHaveBeenCalled()

    act(() => {
      dispatchEvent(new Event('transitionend'))
    })

    rerender({ entered: false })

    expect(onBeforeLeave).toHaveBeenCalledTimes(1)
    expect(onLeave).toHaveBeenCalledTimes(1)
    expect(onAfterLeave).not.toHaveBeenCalled()

    act(() => {
      dispatchEvent(new Event('transitionend'))
    })

    expect(onAfterLeave).not.toHaveBeenCalledTimes(1)
  })
})
