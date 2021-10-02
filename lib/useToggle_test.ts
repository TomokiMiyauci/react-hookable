import { useToggle } from '@/useToggle'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useToggle', () => {
  const table: [boolean | (() => boolean), boolean][] = [
    [false, false],
    [true, true],
    [() => false, false],
    [() => true, true]
  ]
  it.each(table)('should set initial value', (init, expected) => {
    const { result } = renderHook(() => useToggle(init))
    expect(result.current[0]).toBe(expected)
  })
  it('should change state on call toggle', () => {
    const init = false
    const { result } = renderHook(() => useToggle(init))

    expect(result.current[0]).toBe(init)

    act(() => {
      const val = result.current[1]()
      expect(val).toBe(true)
    })
    expect(result.current[0]).toBe(!init)
    act(() => {
      const val = result.current[1]()
      expect(val).toBe(false)
    })
    expect(result.current[0]).toBe(init)

    act(() => {
      const val = result.current[1](true)
      expect(val).toBe(true)
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      const val = result.current[1](false)
      expect(val).toBe(false)
    })
    expect(result.current[0]).toBe(false)
  })
})
