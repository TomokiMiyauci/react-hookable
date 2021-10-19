import { act, renderHook } from '@testing-library/react-hooks'
import { createRef, RefObject } from 'react'

import { useEventListenerEffect } from '@/useEventListenerEffect'

describe('useEventListenerEffect', () => {
  it('should be defined', () => expect(useEventListenerEffect).toBeDefined())

  const table: [HTMLElement | Window | Document | SVGElement][] = [
    [window],
    [document],
    [document.createElement('div')],
    [document.createElementNS('http://www.w3.org/2000/svg', 'svg')]
  ]

  it.each(table)('should fire event', (target) => {
    const listener = jest.fn()
    const type = 'click'
    const { unmount } = renderHook(() =>
      useEventListenerEffect(
        {
          target,
          type,
          listener
        },
        []
      )
    )

    expect(listener).not.toHaveBeenCalled()

    act(() => {
      target.dispatchEvent(new Event(type))
    })

    expect(listener).toHaveBeenCalledTimes(1)
    unmount()
    act(() => {
      target.dispatchEvent(new Event(type))
    })
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it.each(table)('should fire event with functional target', (target) => {
    const listener = jest.fn()
    const { unmount } = renderHook(() =>
      useEventListenerEffect(
        {
          target: () => target,
          type: 'drag',
          listener
        },
        []
      )
    )

    expect(listener).not.toHaveBeenCalled()

    act(() => {
      target.dispatchEvent(new Event('drag'))
    })

    expect(listener).toHaveBeenCalledTimes(1)

    unmount()

    act(() => {
      target.dispatchEvent(new Event('drag'))
    })

    expect(listener).toHaveBeenCalledTimes(1)
  })

  const addEventListenerOptionsTable: [AddEventListenerOptions | boolean][] = [
    [true],
    [false],
    [
      {
        capture: true
      }
    ],
    [
      {
        capture: false
      }
    ],
    [
      {
        passive: true
      }
    ],
    [
      {
        passive: false
      }
    ],
    [
      {
        capture: true,
        once: false,
        passive: true
      }
    ]
  ]

  it.each(addEventListenerOptionsTable)('', (options) => {
    const listener = jest.fn()
    const target = document.createElement('div')
    const type = 'mousemove'
    const { unmount } = renderHook(() =>
      useEventListenerEffect(
        {
          target,
          type,
          listener,
          options
        },
        []
      )
    )

    expect(listener).not.toHaveBeenCalled()

    act(() => {
      target.dispatchEvent(new Event(type))
    })
    expect(listener).toHaveBeenCalledTimes(1)

    unmount()

    act(() => {
      target.dispatchEvent(new Event(type))
    })
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should accept ref object to target', () => {
    const listener = jest.fn()
    const target = createRef<Element>()
    const el = document.createElement('div')
    const type = 'fullscreenchange'
    renderHook(() =>
      useEventListenerEffect(
        {
          target,
          type,
          listener
        },
        []
      )
    )

    expect(listener).not.toHaveBeenCalled()

    act(() => {
      el.dispatchEvent(new Event(type))
    })
    expect(listener).not.toHaveBeenCalled()
  })

  it('should fire event ref object', () => {
    const listener = jest.fn()
    const el = document.createElement('div')
    const target: RefObject<typeof el> = { current: el }

    const type = 'fullscreenchange'
    renderHook(() =>
      useEventListenerEffect(
        {
          target,
          type,
          listener
        },
        []
      )
    )

    expect(listener).not.toHaveBeenCalled()

    act(() => {
      el.dispatchEvent(new Event(type))
    })
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should accept multiple event listeners', () => {
    const touchMove = jest.fn()
    const touchStart = jest.fn()
    const el = document.createElement('div')
    const target: RefObject<typeof el> = { current: el }

    const { unmount } = renderHook(() =>
      useEventListenerEffect(
        {
          target,
          listeners: [
            {
              type: 'touchmove',
              listener: touchMove
            },
            {
              type: 'touchstart',
              listener: touchStart
            }
          ]
        },
        []
      )
    )

    expect(touchMove).not.toHaveBeenCalled()
    expect(touchStart).not.toHaveBeenCalled()

    act(() => {
      el.dispatchEvent(new TouchEvent('touchmove'))
      el.dispatchEvent(new TouchEvent('touchstart'))
    })
    expect(touchMove).toHaveBeenCalledTimes(1)
    expect(touchStart).toHaveBeenCalledTimes(1)

    unmount()

    act(() => {
      el.dispatchEvent(new TouchEvent('touchmove'))
      el.dispatchEvent(new TouchEvent('touchstart'))
    })
    expect(touchMove).toHaveBeenCalledTimes(1)
    expect(touchStart).toHaveBeenCalledTimes(1)
  })
})
