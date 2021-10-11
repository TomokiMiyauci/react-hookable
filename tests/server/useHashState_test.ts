import { act, renderHook } from '@testing-library/react-hooks/server'

import { initializer, useHashState } from '@/useHashState'
import type { Maybe } from '@/utils/types'

describe('useHashState', () => {
  it('should be defined', () => expect(useHashState).toBeDefined())

  it('should be empty string initial state when server side', () => {
    const { result } = renderHook(() => useHashState())

    expect(result.current[0]).toBe('')
  })

  it('should throw error on call server side', () => {
    const { result } = renderHook(() => useHashState())

    act(() => {
      expect(() => result.current[1]('test')).toThrowError(
        'window is not defined'
      )
    })
  })
})

describe('initializer', () => {
  const table: Maybe<string>[] = ['', undefined, 'test']
  it.each(table)('should return empty string', (value) => {
    expect(initializer(value)).toBe('')
  })
})
