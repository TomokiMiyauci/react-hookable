import { act } from '@testing-library/react-hooks'
import { renderHook } from '@testing-library/react-hooks/server'

import { useSequenceState } from '@/useSequenceState'

describe('useSequenceState', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useSequenceState())

    expect(result.error).toBeUndefined()
  })

  it('should not throw error2', () => {
    const { result } = renderHook(() => useSequenceState())

    expect(result.current[0]).toBeFalsy()
    const fn = jest.fn()
    expect(fn).not.toHaveBeenCalled()

    act(() => {
      result.current[1](fn)
    })

    expect(fn).toHaveBeenCalledTimes(1)
  })
})
