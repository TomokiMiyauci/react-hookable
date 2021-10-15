import { act } from '@testing-library/react-hooks'
import { renderHook } from '@testing-library/react-hooks/server'

import { useFetch } from '@/useFetch'

describe('useFetch', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useFetch())

    expect(result.error).toBeUndefined()
  })

  it('should throw error when server side', () => {
    const { result } = renderHook(() => useFetch())

    act(() => {
      expect(() => result.current.use('')).toThrowError('fetch is not defined')
    })
  })
})
