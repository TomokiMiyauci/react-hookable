import { act, renderHook } from '@testing-library/react-hooks'

import { useBoolean } from '@/useBoolean'

describe('useBoolean', () => {
  it('should be defined', () => expect(useBoolean).toBeDefined())

  const table: [boolean | (() => boolean), boolean][] = [
    [false, false],
    [true, true],
    [() => false, false],
    [() => true, true]
  ]
  it.each(table)('should set initial value', (init, expected) => {
    const { result } = renderHook(() => useBoolean(init))
    expect(result.current[0]).toBe(expected)
  })
  it('should change state on call on', () => {
    const init = false
    const { result } = renderHook(() => useBoolean(init))

    expect(result.current[0]).toBe(init)

    act(() => {
      result.current[1].on()
    })
    expect(result.current[0]).toBeTruthy()

    act(() => {
      result.current[1].on()
    })
    expect(result.current[0]).toBeTruthy()
  })
  it('should change state on call off', () => {
    const init = false
    const { result } = renderHook(() => useBoolean(init))

    expect(result.current[0]).toBe(init)

    act(() => {
      result.current[1].off()
    })
    expect(result.current[0]).toBeFalsy()

    act(() => {
      result.current[1].off()
    })
    expect(result.current[0]).toBeFalsy()
  })

  it('should change state on call toggle', () => {
    const init = false
    const { result } = renderHook(() => useBoolean(init))

    expect(result.current[0]).toBe(init)

    act(() => {
      result.current[1].toggle()
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[1].toggle()
    })
    expect(result.current[0]).toBe(false)
  })
})
