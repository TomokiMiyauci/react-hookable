import { act, renderHook } from '@testing-library/react-hooks'

import type { Position } from '@/useWindowScrollState'
import { useWindowScrollState } from '@/useWindowScrollState'

const mockScrollPosition = ({ x, y }: Partial<Position>): void => {
  if (typeof x === 'number') {
    Object.defineProperty(global.window, 'scrollX', { value: x })
  }
  if (typeof y === 'number') {
    Object.defineProperty(global.window, 'scrollY', { value: y })
  }
}

describe('useScroll', () => {
  beforeEach(() => {
    mockScrollPosition({ x: 0, y: 0 })
  })
  it('should be defined', () => expect(useWindowScrollState).toBeDefined())

  it('initial position should be undefined ', () => {
    const { result } = renderHook(() => useWindowScrollState())

    expect(result.current[0].x).toBeUndefined()
    expect(result.current[0].y).toBeUndefined()
  })

  it('position should equal to scrollX and scrollY', () => {
    const { result } = renderHook(() => useWindowScrollState())

    act(() => {
      mockScrollPosition({ x: 0, y: 0 })

      result.current[1].use()
    })

    expect(result.current[0].x).toBe(window.scrollX)
    expect(result.current[0].y).toBe(window.scrollY)
  })

  it('position should equal to scrollX and scrollY', () => {
    const { result } = renderHook(() => useWindowScrollState())

    act(() => {
      mockScrollPosition({ x: 1, y: 1 })
      result.current[1].use()
    })

    expect(result.current[0].x).toBe(1)
    expect(result.current[0].y).toBe(1)
  })

  it('should fire scroll event', () => {
    const { result } = renderHook(() => useWindowScrollState())

    act(() => {
      mockScrollPosition({ x: 0, y: 1 })
      result.current[1].use()
    })

    expect(result.current[0].x).toBe(0)
    expect(result.current[0].y).toBe(1)

    act(() => {
      mockScrollPosition({ x: 0, y: 400 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current[0].x).toBe(0)
    expect(result.current[0].y).toBe(400)
  })

  it('should not fire scroll event after disuse', () => {
    const { result } = renderHook(() => useWindowScrollState())

    act(() => {
      mockScrollPosition({ x: 0, y: 0 })
      result.current[1].use()
    })

    expect(result.current[0].x).toBe(0)
    expect(result.current[0].y).toBe(0)

    act(() => {
      mockScrollPosition({ x: 0, y: 400 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current[0].x).toBe(0)
    expect(result.current[0].y).toBe(400)

    act(() => {
      result.current[1].disuse()
    })

    expect(result.current[0].x).toBeUndefined()
    expect(result.current[0].y).toBeUndefined()

    act(() => {
      mockScrollPosition({ x: 200, y: 200 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current[0].x).toBeUndefined()
    expect(result.current[0].y).toBeUndefined()
  })

  it('should clear auto', () => {
    const { result, unmount } = renderHook(() => useWindowScrollState())

    act(() => {
      mockScrollPosition({ x: 0, y: 0 })
      result.current[1].use()
    })

    expect(result.current[0].x).toBe(0)
    expect(result.current[0].y).toBe(0)

    unmount()

    act(() => {
      mockScrollPosition({ x: 400, y: 400 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current[0].x).toBe(0)
    expect(result.current[0].y).toBe(0)
  })

  it('should clear auto', () => {
    const { result, unmount } = renderHook(() => useWindowScrollState())

    act(() => {
      mockScrollPosition({ x: 0, y: 0 })
      result.current[1].use()
    })

    expect(result.current[0].x).toBe(0)
    expect(result.current[0].y).toBe(0)

    unmount()

    act(() => {
      mockScrollPosition({ x: 400, y: 400 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current[0].x).toBe(0)
    expect(result.current[0].y).toBe(0)
  })
})
