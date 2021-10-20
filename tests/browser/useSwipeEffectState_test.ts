import { act, renderHook } from '@testing-library/react-hooks'

import type { Position } from '@/shared/types'
import type { Direction } from '@/useSwipeEffectState'
import {
  calcDiffX,
  calcDirection,
  initialPosition,
  useSwipeEffectState
} from '@/useSwipeEffectState'

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

describe('useSwipeEffectState', () => {
  it('should be defined', () => expect(useSwipeEffectState).toBeDefined())

  it('should be right initial state', () => {
    const { result } = renderHook(() =>
      useSwipeEffectState({ target: window }, [])
    )

    expect(result.current[0].isSwiping).toBeFalsy()
    expect(result.current[0].lengthX).toBe(0)
    expect(result.current[0].lengthY).toBe(0)
    expect(result.current[0].coordsStart).toEqual({ x: 0, y: 0 })
    expect(result.current[0].coordsEnd).toEqual({ x: 0, y: 0 })
    expect(result.current[0].direction).toBe('NONE')
  })

  it('should fire touchstart', () => {
    const el = document.createElement('div')
    const onSwipeStart = jest.fn()
    const { result } = renderHook(() =>
      useSwipeEffectState({ target: el, onSwipeStart }, [])
    )

    const position: Position = {
      x: 20,
      y: 0
    }

    const touchEvent = new TouchEvent(
      'touchstart',
      mockTouchEventInit({ ...position, target: el })
    )
    act(() => {
      el.dispatchEvent(touchEvent)
    })

    expect(result.current[0].isSwiping).toBeFalsy()
    expect(onSwipeStart).toHaveBeenCalled()
    expect(onSwipeStart).toHaveBeenCalledWith(touchEvent)
    expect(result.current[0].coordsStart).toEqual(position)
    expect(result.current[0].coordsEnd).toEqual(position)
  })

  it('should fire touchmove', () => {
    const el = document.createElement('div')
    const onSwipe = jest.fn()

    const { result } = renderHook(() =>
      useSwipeEffectState({ target: el, onSwipe }, [])
    )

    const position: Position = {
      x: 20,
      y: 0
    }

    const touchEvent = new TouchEvent(
      'touchmove',
      mockTouchEventInit({ ...position, target: el })
    )
    act(() => {
      el.dispatchEvent(touchEvent)
    })

    expect(result.current[0].isSwiping).toBeTruthy()
    expect(onSwipe).toHaveBeenCalled()
    expect(onSwipe).toHaveBeenCalledWith(touchEvent)
    expect(result.current[0].coordsStart).toEqual({ x: 0, y: 0 })
    expect(result.current[0].coordsEnd).toEqual(position)
  })

  it('should fire touchend', () => {
    const el = document.createElement('div')
    const onSwipeEnd = jest.fn()

    const { result } = renderHook(() =>
      useSwipeEffectState({ target: el, onSwipeEnd }, [])
    )

    const position: Position = {
      x: 20,
      y: 0
    }

    const touchEvent = new TouchEvent(
      'touchend',
      mockTouchEventInit({ ...position, target: el })
    )
    act(() => {
      el.dispatchEvent(touchEvent)
    })

    expect(result.current[0].isSwiping).toBeFalsy()
    expect(onSwipeEnd).toHaveBeenCalled()
    expect(onSwipeEnd).toHaveBeenCalledWith(touchEvent)
    expect(result.current[0].coordsEnd).toEqual({ x: 0, y: 0 })
    expect(result.current[0].coordsStart).toEqual({ x: 0, y: 0 })
  })

  it('should fire lifecycle', () => {
    const el = document.createElement('div')
    const { result } = renderHook(() => useSwipeEffectState({ target: el }, []))

    const position: Position = {
      x: 20,
      y: 0
    }

    const touchStartEvent = new TouchEvent(
      'touchstart',
      mockTouchEventInit({ ...position, target: el })
    )
    act(() => {
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

describe('calcDiffX', () => {
  const table: [number, number, number][] = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 0, -1]
  ]
  it.each(table)(
    'calcDiff({ startX: %d, startY: %d} => %d)',
    (startX, endX, expected) => {
      expect(
        calcDiffX({
          startX,
          endX
        })
      ).toBe(expected)
    }
  )
})

describe('calcDirection', () => {
  const table: [number, number, Direction | 'NONE'][] = [
    [0, 0, 'NONE'],
    [1, 0, 'RIGHT'],
    [-1, 0, 'LEFT'],
    [0, 1, 'UP'],
    [0, -1, 'DOWN']
  ]

  it.each(table)(
    'calcDirection({ diffX: %d, diffY: %d} => %d)',
    (diffX, diffY, expected) => {
      expect(calcDirection({ diffX, diffY })).toBe(expected)
    }
  )
})
