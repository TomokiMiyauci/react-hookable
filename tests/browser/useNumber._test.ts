import { act, renderHook } from '@testing-library/react-hooks'

import { reducer, useNumber } from '@/useNumber'

describe('useNumber', () => {
  it('should be defined', () => expect(useNumber).toBeDefined())

  it('should be 0 when not pass initial state', () => {
    const { result } = renderHook(() => useNumber())

    expect(result.current[0]).toBe(0)
  })

  it('should pass initial state', () => {
    const initialState = 100
    const { result } = renderHook(() => useNumber(initialState))

    expect(result.current[0]).toBe(initialState)
  })

  it('should increase with inc function', () => {
    const { result } = renderHook(() => useNumber())

    act(() => {
      result.current[1].inc()
    })

    expect(result.current[0]).toBe(1)

    act(() => {
      result.current[1].inc(5)
    })

    expect(result.current[0]).toBe(6)

    expect.assertions(2)
  })

  it('should decrease with dec function', () => {
    const { result } = renderHook(() => useNumber())

    act(() => {
      result.current[1].dec()
    })

    expect(result.current[0]).toBe(-1)

    act(() => {
      result.current[1].dec(5)
    })

    expect(result.current[0]).toBe(-6)

    expect.assertions(2)
  })

  it('should set any number with dec function', () => {
    const { result } = renderHook(() => useNumber())

    act(() => {
      result.current[1].set(100)
    })

    expect(result.current[0]).toBe(100)

    act(() => {
      result.current[1].set(0)
    })

    expect(result.current[0]).toBe(0)

    expect.assertions(2)
  })
})

describe('reducer', () => {
  const table: [...Parameters<typeof reducer>, number][] = [
    [
      0,
      {
        type: 'increment'
      },
      1
    ],
    [
      0,
      {
        type: 'increment',
        payload: 5
      },
      5
    ],
    [
      100,
      {
        type: 'decrement'
      },
      99
    ],
    [
      100,
      {
        type: 'decrement',
        payload: 50
      },
      50
    ],
    [
      100,
      {
        type: 'set',
        payload: 50
      },
      50
    ],
    [
      100,
      {
        type: 'set'
      },
      0
    ]
  ]
  it.each(table)(
    'should return right value',
    (initialState, action, expected) => {
      expect(reducer(initialState, action)).toBe(expected)
    }
  )
})
