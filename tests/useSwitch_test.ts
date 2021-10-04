import { act, renderHook } from '@testing-library/react-hooks'

import { useSwitch } from '@/useSwitch'

describe('useSwitch', () => {
  const table: [boolean | (() => boolean), boolean][] = [
    [false, false],
    [true, true],
    [() => false, false],
    [() => true, true]
  ]
  it.each(table)('should set initial value', (init, expected) => {
    const { result } = renderHook(() => useSwitch(init))
    expect(result.current[0]).toBe(expected)
  })
  it('should change state on call on', () => {
    const init = false
    const { result } = renderHook(() => useSwitch(init))

    expect(result.current[0]).toBe(init)

    act(() => {
      const val = result.current[1].on()
      expect(val).toBe(true)
    })
    expect(result.current[0]).toBe(true)
  })
  it('should change state on call off', () => {
    const init = true
    const { result } = renderHook(() => useSwitch(init))

    expect(result.current[0]).toBe(init)

    act(() => {
      const val = result.current[1].off()
      expect(val).toBe(false)
    })
    expect(result.current[0]).toBe(false)
  })
})
