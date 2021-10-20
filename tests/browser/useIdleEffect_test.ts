import { act, renderHook } from '@testing-library/react-hooks'

import { oneMinute, useIdleEffect, userInteractions } from '@/useIdleEffect'

describe('useIdleEffect', () => {
  it('should be defined', () => expect(useIdleEffect).toBeDefined())

  it('should not call nothing when mount', () => {
    const onIdle = jest.fn()
    const onInteract = jest.fn()
    const onActive = jest.fn()
    renderHook(() =>
      useIdleEffect({
        onIdle,
        onInteract,
        onActive
      })
    )

    expect(onIdle).not.toHaveBeenCalled()
    expect(onInteract).not.toHaveBeenCalled()
    expect(onActive).not.toHaveBeenCalled()
  })

  const table: (keyof WindowEventMap)[] = userInteractions

  it.each(table)('should call onInteract with default event', (type) => {
    const onInteract = jest.fn()
    const { unmount } = renderHook(() =>
      useIdleEffect({
        onInteract
      })
    )

    expect(onInteract).not.toHaveBeenCalled()
    act(() => {
      window.dispatchEvent(new Event(type))
    })

    expect(onInteract).toHaveBeenCalledTimes(1)

    unmount()

    act(() => {
      window.dispatchEvent(new Event(type))
    })
    expect(onInteract).toHaveBeenCalledTimes(1)
  })

  it('should overwrite events', () => {
    const onInteract = jest.fn()
    const type = 'drag'
    renderHook(() =>
      useIdleEffect({
        onInteract,
        events: [type]
      })
    )

    expect(onInteract).not.toHaveBeenCalled()
    act(() => {
      window.dispatchEvent(new Event('mousemove'))
    })

    expect(onInteract).not.toHaveBeenCalled()

    act(() => {
      window.dispatchEvent(new Event(type))
    })
    expect(onInteract).toHaveBeenCalledTimes(1)
  })

  it('should call onIdle when default 60000ms exceed', () => {
    jest.useFakeTimers()
    const onIdle = jest.fn()
    renderHook(() =>
      useIdleEffect({
        onIdle
      })
    )

    expect(onIdle).not.toHaveBeenCalled()
    act(() => {
      jest.advanceTimersByTime(oneMinute)
    })

    expect(onIdle).toHaveBeenCalledTimes(1)

    act(() => {
      jest.runAllTimers()
    })
    expect(onIdle).toHaveBeenCalledTimes(1)
  })

  it('should overwrite timeout', () => {
    jest.useFakeTimers()
    const onIdle = jest.fn()
    const timeout = 1000000
    renderHook(() =>
      useIdleEffect({
        onIdle,
        timeout
      })
    )

    expect(onIdle).not.toHaveBeenCalled()
    act(() => {
      jest.advanceTimersByTime(oneMinute)
    })

    expect(onIdle).not.toHaveBeenCalled()
    act(() => {
      jest.advanceTimersByTime(timeout)
    })

    expect(onIdle).toHaveBeenCalledTimes(1)

    act(() => {
      jest.runAllTimers()
    })

    expect(onIdle).toHaveBeenCalledTimes(1)
  })

  it('should call onActive', () => {
    jest.useFakeTimers()
    const onIdle = jest.fn()
    const onActive = jest.fn()
    renderHook(() =>
      useIdleEffect({
        onIdle,
        onActive
      })
    )

    expect(onIdle).not.toHaveBeenCalled()
    expect(onActive).not.toHaveBeenCalled()
    act(() => {
      jest.advanceTimersByTime(oneMinute)
    })

    expect(onIdle).toHaveBeenCalledTimes(1)
    expect(onActive).not.toHaveBeenCalled()

    act(() => {
      window.dispatchEvent(new Event(userInteractions[0]))
    })

    expect(onIdle).toHaveBeenCalledTimes(1)
    expect(onActive).toHaveBeenCalledTimes(1)

    act(() => {
      jest.advanceTimersByTime(oneMinute)
    })

    expect(onIdle).toHaveBeenCalledTimes(2)
    expect(onActive).toHaveBeenCalledTimes(1)

    act(() => {
      window.dispatchEvent(new Event(userInteractions[1]))
    })

    expect(onIdle).toHaveBeenCalledTimes(2)
    expect(onActive).toHaveBeenCalledTimes(2)
  })
})
