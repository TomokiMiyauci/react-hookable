import { renderHook } from '@testing-library/react-hooks'

import { useEventListener } from '@/useEventListener'

describe('useEventListener', () => {
  const table: [EventTarget][] = [
    [window],
    [document],
    [document.createElement('div')],
    [document.createElement('video')],
    [document.createElement('a')]
  ]

  it.each(table)('should not fire when nothing to do', (target) => {
    const fn = jest.fn()

    renderHook(() => useEventListener(target, 'keydown', fn))

    expect(fn).not.toHaveBeenCalled()
  })

  it.each(table)('should fire any EventTarget', (target) => {
    const fn = jest.fn()
    const type = 'mouseup'
    renderHook(() => useEventListener(target, type, fn))

    const ev = new Event(type)
    target.dispatchEvent(ev)

    expect(fn).toHaveBeenCalled()
  })

  it('should fire event', () => {
    const fn = jest.fn()
    renderHook(() => useEventListener(window, 'keydown', fn))
    const ev = new Event('keydown')
    window.dispatchEvent(ev)

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should fire event twice', () => {
    const fn = jest.fn()
    renderHook(() => useEventListener(window, 'mousedown', fn))

    const ev = new Event('mousedown')
    window.dispatchEvent(ev)
    window.dispatchEvent(ev)

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should not fire after on mount', () => {
    const fn = jest.fn()
    const { unmount } = renderHook(() =>
      useEventListener(window, 'keydown', fn)
    )

    const ev = new Event('keydown')
    window.dispatchEvent(ev)

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)

    unmount()

    window.dispatchEvent(ev)

    expect(fn).toHaveBeenCalledTimes(1)
  })
})
