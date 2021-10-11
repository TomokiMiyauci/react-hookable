import { act } from '@testing-library/react-hooks'
import { renderHook } from '@testing-library/react-hooks/server'

import { useUnmount } from '@/useUnmount'

describe('useUnmount', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useUnmount())

    const fn = jest.fn()

    expect(result.error).toBeUndefined()

    act(() => {
      expect(() => result.current.use(fn)).not.toThrowError()
    })

    expect(fn).not.toHaveBeenCalled()
  })
})
