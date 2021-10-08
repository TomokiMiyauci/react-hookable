import { act, renderHook } from '@testing-library/react-hooks'

import { useEventListener } from '@/useEventListener'

describe('useEventListener', () => {
  it('should be defined', () => expect(useEventListener).toBeDefined())

  const table: [EventTarget][] = [
    [window],
    [document],
    [document.createElement('div')],
    [document.createElement('video')],
    [document.createElement('a')]
  ]

  it.each(table)('should not fire when nothing to do', (target) => {
    const fn = jest.fn()

    const { result } = renderHook(() => useEventListener())

    act(() => {
      result.current.add(target, 'keydown', fn)
    })

    expect(fn).not.toHaveBeenCalled()
  })

  it.each(table)(
    'should fire any EventTarget and clean up automatically',
    (target) => {
      const fn = jest.fn()
      const type = 'mouseup'
      const {
        result: {
          current: { add }
        },
        unmount
      } = renderHook(() => useEventListener())

      act(() => {
        add(target, type, fn)
      })
      const ev = new Event(type)
      target.dispatchEvent(ev)

      expect(fn).toHaveBeenCalledTimes(1)
      unmount()
      expect(fn).toHaveBeenCalledTimes(1)
    }
  )

  it.each(table)('should fire event twice', (target) => {
    const fn = jest.fn()
    const type = 'keypress'
    const {
      result: {
        current: { add }
      }
    } = renderHook(() => useEventListener())

    act(() => {
      add(target, type, fn)
    })

    const ev = new Event(type)
    target.dispatchEvent(ev)
    target.dispatchEvent(ev)

    expect(fn).toHaveBeenCalledTimes(2)
  })

  it.each(table)(
    'should remove event listener with remove function',
    (target) => {
      const fn = jest.fn()
      const type = 'keypress'
      const {
        result: {
          current: { add, remove, _ref }
        }
      } = renderHook(() => useEventListener())

      act(() => {
        add(target, type, fn)
      })

      const ev = new Event(type)
      target.dispatchEvent(ev)
      expect(fn).toHaveBeenCalledTimes(1)
      expect(_ref.current).toHaveLength(1)
      act(remove)
      expect(_ref.current).toHaveLength(0)
      target.dispatchEvent(ev)
      expect(fn).toHaveBeenCalledTimes(1)
    }
  )

  it('should can pass target as function', () => {
    const {
      result: {
        current: { add }
      }
    } = renderHook(() => useEventListener())
    const type = 'keypress'
    const listener = jest.fn()

    act(() => {
      add(() => window, type, listener)
    })

    window.dispatchEvent(new Event(type))
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should remove all event listener with remove function', () => {
    const listener1 = jest.fn()
    const listener2 = jest.fn()
    const type = 'keypress'
    const {
      result: {
        current: { add, remove }
      }
    } = renderHook(() => useEventListener())

    act(() => {
      add(window, type, listener1)
      add(document, type, listener2)
    })

    const ev = new Event(type)
    window.dispatchEvent(ev)
    document.dispatchEvent(ev)
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)
    act(remove)
    window.dispatchEvent(ev)
    document.dispatchEvent(ev)
    expect(listener1).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(1)
  })

  it.each(table)('should not clean up when pass option', (target) => {
    const fn = jest.fn()
    const type = 'keypress'
    const {
      result: {
        current: { add }
      },
      unmount
    } = renderHook(() => useEventListener({ clearAuto: false }))

    act(() => {
      add(target, type, fn)
    })
    const ev = new Event(type)
    target.dispatchEvent(ev)
    expect(fn).toHaveBeenCalledTimes(1)
    unmount()
    target.dispatchEvent(ev)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  const eventListenerOptions: [
    AddEventListenerOptions | boolean | undefined
  ][] = [
    [true],
    [false],
    [{}],
    [
      {
        capture: true
      }
    ],
    [
      {
        once: true,
        capture: true
      }
    ],
    [
      {
        passive: true,
        capture: true
      }
    ]
  ]
  it.each(eventListenerOptions)(
    'should clean up when pass addEventListener option',
    (options) => {
      const fn = jest.fn()
      const type = 'keypress'
      const {
        result: {
          current: { add }
        },
        unmount
      } = renderHook(() => useEventListener())

      const el = document.createElement('div')
      act(() => {
        add(el, type, fn, options)
        add(document, type, fn, options)
      })
      const ev = new Event(type)
      document.dispatchEvent(ev)
      el.dispatchEvent(ev)
      expect(fn).toHaveBeenCalledTimes(2)
      unmount()
      document.dispatchEvent(ev)
      el.dispatchEvent(ev)
      expect(fn).toHaveBeenCalledTimes(2)
    }
  )
})
