import { act, renderHook } from '@testing-library/react-hooks'

import { formatHash, useHash } from '@/useHash'
import type { Maybe } from '@/utils/types'

describe('useHash', () => {
  beforeEach(() => {
    window.location.hash = ''
  })
  it('should be defined', () => expect(useHash).toBeDefined())

  it('should change window hash and state when call setHash', async () => {
    const { result, waitForValueToChange } = renderHook(() => useHash())

    expect(window.location.hash).toBe('')
    expect(result.current[0]).toBe('')

    act(() => {
      result.current[1]('test')
    })

    await waitForValueToChange(() => result.current[0])
    expect(window.location.hash).toBe('#test')
    expect(result.current[0]).toBe('#test')
  })

  const table: [Maybe<string>, string][] = [
    ['#test', '#test'],
    ['', ''],
    ['test', '#test'],
    ['###', '###'],
    ['-', '#-'],
    [undefined, '']
  ]

  it.each(table)('should change init hash with hash', (initState, expected) => {
    const { result } = renderHook(() => useHash(initState))

    expect(window.location.hash).toBe(expected)
    expect(result.current[0]).toBe(expected)
  })

  it('should return hash without hash tag when trimHash is true', async () => {
    const { result, waitForValueToChange } = renderHook(() =>
      useHash(undefined, { trimHash: true })
    )

    expect(window.location.hash).toBe('')
    expect(result.current[0]).toBe('')

    act(() => {
      result.current[1]('test')
    })

    await waitForValueToChange(() => result.current[0])

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

  it('should change hash when trimHash changed', async () => {
    const { result, rerender, waitForValueToChange } = renderHook(
      ({ trimHash }) => useHash(undefined, { trimHash }),
      {
        initialProps: {
          trimHash: false
        }
      }
    )
    expect(result.current[0]).toBe('')
    act(() => {
      result.current[1]('test')
    })

    expect(window.location.hash).toBe('#test')
    await waitForValueToChange(() => result.current[0])

    expect(result.current[0]).toBe('#test')

    rerender({
      trimHash: true
    })

    expect(window.location.hash).toBe('#test')
    expect(result.current[0]).toBe('test')
  })

  it('should not do anything when hash is same', async () => {
    const { result, waitForValueToChange } = renderHook(() => useHash())
    expect(result.current[0]).toBe('')
    act(() => {
      result.current[1]('test')
    })
    expect(window.location.hash).toBe('#test')
    await waitForValueToChange(() => result.current[0])

    expect(result.current[0]).toBe('#test')
    act(() => {
      result.current[1]('test')
    })
    expect(window.location.hash).toBe('#test')

    expect(result.current[0]).toBe('#test')
  })

  it('should not fire hashchange after unmounted', async () => {
    const { result, unmount, waitForValueToChange } = renderHook(() =>
      useHash()
    )
    expect(result.current[0]).toBe('')
    act(() => {
      result.current[1]('test')
    })
    expect(window.location.hash).toBe('#test')
    await waitForValueToChange(() => result.current[0])

    expect(result.current[0]).toBe('#test')
    unmount()
    act(() => {
      result.current[1]('abc')
    })
    expect(window.location.hash).toBe('#abc')
    expect(result.current[0]).toBe('#test')
  })

  it('should not fire hashchange after unmounted', async () => {
    const { result, unmount, waitForValueToChange } = renderHook(() =>
      useHash()
    )
    expect(result.current[0]).toBe('')
    act(() => {
      result.current[1]('test')
    })
    expect(window.location.hash).toBe('#test')
    await waitForValueToChange(() => result.current[0])

    expect(result.current[0]).toBe('#test')
    unmount()
    act(() => {
      result.current[1]('abc')
    })
    expect(window.location.hash).toBe('#abc')
    expect(result.current[0]).toBe('#test')
  })
})

describe('formatHash', () => {
  const table: [string, string][] = [
    ['', ''],
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
