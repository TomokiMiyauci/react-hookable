import { act, renderHook } from '@testing-library/react-hooks'

import { formatHash, initializer, useHash } from '@/useHash'
import type { Maybe } from '@/utils/types'

describe('useHash', () => {
  beforeEach(() => {
    window.location.hash = ''
  })
  it('should be defined', () => expect(useHash).toBeDefined())

  it('should change window hash and state when call setHash', () => {
    const { result } = renderHook(() => useHash())

    expect(window.location.hash).toBe('')
    expect(result.current[0]).toBe('')

    act(() => {
      result.current[1]('test')
    })

    expect(window.location.hash).toBe('#test')
    expect(result.current[0]).toBe('#test')
  })

  const table: [Maybe<string> | (() => string), string][] = [
    ['#test', '#test'],
    ['', ''],
    ['test', '#test'],
    ['###', '###'],
    ['-', '#-'],
    [undefined, ''],
    [() => '', ''],
    [() => 'test', '#test']
  ]

  it.each(table)('should change init hash with hash', (initState, expected) => {
    const { result } = renderHook(() => useHash(initState))

    expect(window.location.hash).toBe(expected)
    expect(result.current[0]).toBe(decodeURI(expected))
  })

  it('should clear hash when pass empty string or undefined', () => {
    const { result } = renderHook(() => useHash(undefined, { hashMark: false }))

    expect(window.location.hash).toBe('')
    expect(result.current[0]).toBe('')

    act(() => {
      result.current[1]('test')
    })

    expect(window.location.hash).toBe('#test')
    expect(result.current[0]).toBe('test')
  })

  it('should return hash without hash tag when hashMark is false', () => {
    const { result } = renderHook(() => useHash(undefined, { hashMark: false }))

    expect(window.location.hash).toBe('')
    expect(result.current[0]).toBe('')

    act(() => {
      result.current[1]('test')
    })

    expect(window.location.hash).toBe('#test')
    expect(result.current[0]).toBe('test')
  })

  it('should return latest url hash when change the hash with "hashchange" event', async () => {
    const { result, waitForValueToChange } = renderHook(() => useHash())
    expect(result.current[0]).toBe('')
    act(() => {
      window.location.hash = '#test'
    })

    await waitForValueToChange(() => result.current[0])

    expect(result.current[0]).toBe('#test')
  })

  it('should change hash when hashMark changed', () => {
    const { result, rerender } = renderHook(
      ({ hashMark }) => useHash(undefined, { hashMark }),
      {
        initialProps: {
          hashMark: true
        }
      }
    )
    expect(result.current[0]).toBe('')
    act(() => {
      result.current[1]('test')
    })

    expect(window.location.hash).toBe('#test')

    expect(result.current[0]).toBe('#test')

    rerender({
      hashMark: false
    })

    expect(window.location.hash).toBe('#test')
    expect(result.current[0]).toBe('test')
  })

  it('should not do anything when hash is same', () => {
    const { result } = renderHook(() => useHash())
    expect(result.current[0]).toBe('')
    act(() => {
      result.current[1]('test')
    })
    expect(window.location.hash).toBe('#test')

    expect(result.current[0]).toBe('#test')
    act(() => {
      result.current[1]('test')
    })
    expect(window.location.hash).toBe('#test')

    expect(result.current[0]).toBe('#test')
  })

  it('should not fire hashchange after unmounted', () => {
    const { result, unmount } = renderHook(() => useHash())
    expect(result.current[0]).toBe('')
    act(() => {
      result.current[1]('test')
    })
    expect(window.location.hash).toBe('#test')

    expect(result.current[0]).toBe('#test')
    unmount()
    act(() => {
      result.current[1]('abc')
    })
    expect(window.location.hash).toBe('#abc')
    expect(result.current[0]).toBe('#test')
  })

  it('should not fire hashchange after unmounted', () => {
    const { result, unmount } = renderHook(() => useHash())
    expect(result.current[0]).toBe('')
    act(() => {
      result.current[1]('test')
    })
    expect(window.location.hash).toBe('#test')

    expect(result.current[0]).toBe('#test')
    unmount()
    act(() => {
      result.current[1]('abc')
    })
    expect(window.location.hash).toBe('#abc')
    expect(result.current[0]).toBe('#test')
  })

  describe('more detail', () => {
    beforeEach(() => {
      window.location.hash = ''
      window.location.hash = 'test'
    })

    it('should clean hash when initialState is empty string', () => {
      const { result } = renderHook(() => useHash())

      expect(window.location.hash).toBe('#test')
      expect(result.current[0]).toBe('#test')

      act(() => {
        result.current[1]('')
      })

      expect(window.location.hash).toBe('')
      expect(result.current[0]).toBe('')
    })

    const table: [Maybe<string> | (() => string), string][] = [
      ['#test', '#test'],
      ['', ''],
      [' ', ''], // hash: #
      ['test', '#test'],
      ['###', '###'],
      ['-', '#-'],
      [undefined, '#test'],
      [() => '', ''],
      [() => 'test', '#test']
    ]

    it.each(table)(
      'should change init hash with hash',
      (initState, expected) => {
        const { result } = renderHook(() => useHash(initState))

        expect(window.location.hash).toBe(expected)
        expect(result.current[0]).toBe(expected)
      }
    )

    it('should not change hash when pass same hash', () => {
      const { result } = renderHook(() => useHash())

      expect(window.location.hash).toBe('#test')
      expect(result.current[0]).toBe('#test')

      act(() => {
        result.current[1]('test')
      })

      expect(window.location.hash).toBe('#test')
      expect(result.current[0]).toBe('#test')
    })

    it('should only change trimmed hash when when pass same hash and hashMark is false', () => {
      const { result } = renderHook(() =>
        useHash(undefined, { hashMark: false })
      )

      expect(window.location.hash).toBe('#test')
      expect(result.current[0]).toBe('test')

      act(() => {
        result.current[1]('test')
      })

      expect(window.location.hash).toBe('#test')
      expect(result.current[0]).toBe('test')
    })

    it('should return hash without hash tag when hashMark is false', () => {
      const { result } = renderHook(() =>
        useHash(undefined, { hashMark: false })
      )

      expect(window.location.hash).toBe('#test')
      expect(result.current[0]).toBe('test')

      act(() => {
        result.current[1]('a')
      })

      expect(window.location.hash).toBe('#a')
      expect(result.current[0]).toBe('a')
    })
  })
})

describe('formatHash', () => {
  const table: [string, string][] = [
    ['', ' '],
    [' ', '# '],
    ['#', '#'],
    ['##', '##'],
    ['###', '###'],
    ['a', '#a'],
    ['あ', '#あ']
  ]
  it.each(table)('should return formatHash(%s) => %s', (value, expected) => {
    expect(formatHash(value)).toBe(expected)
  })
})

describe('initializer', () => {
  beforeEach(() => {
    window.location.hash = ''
  })
  const table: [Maybe<string> | (() => string), string][] = [
    ['', ''],
    [undefined, ''],
    ['test', '#test'],
    [() => '', ''],
    [() => 'test', '#test']
  ]
  it.each(table)(
    'should return hash and effect location hash',
    (value, expected) => {
      expect(initializer(value)).toBe(expected)
      expect(window.location.hash).toBe(expected)
    }
  )
})
