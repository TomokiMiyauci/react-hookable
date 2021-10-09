import { act, renderHook } from '@testing-library/react-hooks/server'

import { initializer, useHash } from '@/useHash'
import type { Maybe } from '@/utils/types'

describe('useHash', () => {
  it('should be defined', () => expect(useHash).toBeDefined())

  it('should be empty string initial state when server side', () => {
    const { result } = renderHook(() => useHash())

    expect(result.current[0]).toBe('')
  })

  it('should throw error on call server side', () => {
    const { result } = renderHook(() => useHash())

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
