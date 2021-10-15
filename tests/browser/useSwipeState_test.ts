import { act, renderHook } from '@testing-library/react-hooks'

import type { Position } from '@/shared/types'
import { initialPosition, useSwipeState } from '@/useSwipeState'

const mockTouchEventInit = ({
  x,
  y,
  target
}: {
  x: number
  y: number
  target: EventTarget
}): TouchEventInit => ({
  touches: [
    {
      clientX: x,
      clientY: y,
      force: 0,
      identifier: 0,
      pageX: 0,
      pageY: 0,
      radiusX: 0,
      radiusY: 0,
      rotationAngle: 0,
      screenX: 0,
      screenY: 0,
      target
    }
  ]
})

describe('useSwipeState', () => {
  it('should be defined', () => expect(useSwipeState).toBeDefined())

  it('should be right initial state', () => {
    const { result } = renderHook(() => useSwipeState())

    expect(result.current[0].isSwiping).toBeFalsy()
    expect(result.current[0].lengthX).toBe(0)
    expect(result.current[0].lengthY).toBe(0)
    expect(result.current[0].coordsStart).toEqual({ x: 0, y: 0 })
    expect(result.current[0].coordsEnd).toEqual({ x: 0, y: 0 })
    expect(result.current[0].direction).toBe('NONE')
  })

  it('should fire touchstart', () => {
    const { result } = renderHook(() => useSwipeState())

    const el = document.createElement('div')
    const position: Position = {
      x: 20,
      y: 0
    }

    const onSwipeStart = jest.fn()

    const touchEvent = new TouchEvent(
      'touchstart',
      mockTouchEventInit({ ...position, target: el })
    )
    act(() => {
      result.current[1].use(el, {
        onSwipeStart
      })
      el.dispatchEvent(touchEvent)
    })

    expect(result.current[0].isSwiping).toBeFalsy()
    expect(onSwipeStart).toHaveBeenCalled()
    expect(onSwipeStart).toHaveBeenCalledWith(touchEvent)
    expect(result.current[0].coordsStart).toEqual(position)
    expect(result.current[0].coordsEnd).toEqual(position)
  })

  it('should fire touchmove', () => {
    const { result } = renderHook(() => useSwipeState())

    const el = document.createElement('div')
    const position: Position = {
      x: 20,
      y: 0
    }

    const onSwipe = jest.fn()

    const touchEvent = new TouchEvent(
      'touchmove',
      mockTouchEventInit({ ...position, target: el })
    )
    act(() => {
      result.current[1].use(el, {
        onSwipe
      })
      el.dispatchEvent(touchEvent)
    })

    expect(result.current[0].isSwiping).toBeTruthy()
    expect(onSwipe).toHaveBeenCalled()
    expect(onSwipe).toHaveBeenCalledWith(touchEvent)
    expect(result.current[0].coordsStart).toEqual({ x: 0, y: 0 })
    expect(result.current[0].coordsEnd).toEqual(position)
  })

  it('should fire touchend', () => {
    const { result } = renderHook(() => useSwipeState())

    const el = document.createElement('div')
    const position: Position = {
      x: 20,
      y: 0
    }

    const onSwipeEnd = jest.fn()

    const touchEvent = new TouchEvent(
      'touchend',
      mockTouchEventInit({ ...position, target: el })
    )
    act(() => {
      result.current[1].use(el, {
        onSwipeEnd
      })
      el.dispatchEvent(touchEvent)
    })

    expect(result.current[0].isSwiping).toBeFalsy()
    expect(onSwipeEnd).toHaveBeenCalled()
    expect(onSwipeEnd).toHaveBeenCalledWith(touchEvent)
    expect(result.current[0].coordsEnd).toEqual({ x: 0, y: 0 })
    expect(result.current[0].coordsStart).toEqual({ x: 0, y: 0 })
  })

  it('should fire lifecycle', () => {
    const { result } = renderHook(() => useSwipeState())

    const el = document.createElement('div')
    const position: Position = {
      x: 20,
      y: 0
    }

    const touchStartEvent = new TouchEvent(
      'touchstart',
      mockTouchEventInit({ ...position, target: el })
    )
    act(() => {
      result.current[1].use(el)
      el.dispatchEvent(touchStartEvent)
    })

    expect(result.current[0].isSwiping).toBeFalsy()
    expect(result.current[0].coordsEnd).toEqual(position)
    expect(result.current[0].coordsStart).toEqual(position)
    expect(result.current[0].lengthX).toBe(0)
    expect(result.current[0].lengthY).toBe(0)
    expect(result.current[0].direction).toBe('NONE')

    const movePosition: Position = {
      x: 100,
      y: -30
    }

    const touchMoveEvent = new TouchEvent(
      'touchmove',
      mockTouchEventInit({ ...movePosition, target: el })
    )

    act(() => {
      el.dispatchEvent(touchMoveEvent)
    })

    expect(result.current[0].isSwiping).toBeTruthy()
    expect(result.current[0].direction).toBe('RIGHT')
    expect(result.current[0].lengthX).toBe(80)
    expect(result.current[0].lengthY).toBe(30)
    expect(result.current[0].coordsEnd).toEqual(movePosition)
    expect(result.current[0].coordsStart).toEqual(position)

    const endPosition: Position = {
      x: 200,
      y: -100
    }

    const touchEndEvent = new TouchEvent(
      'touchend',
      mockTouchEventInit({ ...endPosition, target: el })
    )

    act(() => {
      el.dispatchEvent(touchEndEvent)
    })

    expect(result.current[0].isSwiping).toBeFalsy()
    expect(result.current[0].direction).toBe('RIGHT')
    expect(result.current[0].lengthX).toBe(80)
    expect(result.current[0].lengthY).toBe(30)
    expect(result.current[0].coordsEnd).toEqual(movePosition)
    expect(result.current[0].coordsStart).toEqual(position)

    act(result.current[1].reset)
    expect(result.current[0].isSwiping).toBeFalsy()
    expect(result.current[0].direction).toBe('NONE')
    expect(result.current[0].lengthX).toBe(0)
    expect(result.current[0].lengthY).toBe(0)
    expect(result.current[0].coordsEnd).toEqual(initialPosition)
    expect(result.current[0].coordsStart).toEqual(initialPosition)
  })
})
