import { renderHook } from '@testing-library/react-hooks'
import { createRef } from 'react'

import { useIntersectionObserverEffect } from '@/useIntersectionObserverEffect'

describe('useIntersectionObserverEffect', () => {
  it('should be defined', () =>
    expect(useIntersectionObserverEffect).toBeDefined())

  it('should call observe and when unmount, disconnect', () => {
    const observe = jest.fn()
    const disconnect = jest.fn()
    const callback = jest.fn()
    const options: IntersectionObserverInit = { rootMargin: '1px' }

    global.IntersectionObserver = jest
      .fn()
      .mockImplementation(
        (
          _callback: IntersectionObserverCallback,
          _options?: IntersectionObserverInit | undefined
        ) => {
          expect(_callback).toEqual(callback)
          expect(_options).toEqual(options)
          return {
            observe,
            disconnect
          }
        }
      )

    const { unmount } = renderHook(() =>
      useIntersectionObserverEffect({
        target: () => document.createElement('div'),
        callback,
        options
      })
    )

    expect(observe).toHaveBeenCalledTimes(1)
    unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
  })

  it('should not call observe when ref is null', () => {
    const observe = jest.fn()
    const disconnect = jest.fn()

    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe,
      disconnect
    }))

    const target = createRef<Element>()

    const callback = jest.fn()
    const { unmount } = renderHook(() =>
      useIntersectionObserverEffect({
        target,
        callback
      })
    )

    expect(observe).not.toHaveBeenCalled()
    unmount()
    expect(disconnect).not.toHaveBeenCalled()
  })
})
