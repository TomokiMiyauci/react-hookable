import { renderHook } from '@testing-library/react-hooks'

import type { MetaKey } from '@/useShortcut'
import { useShortcut, validateKeyMap } from '@/useShortcut'
import type { Alphabet } from '@/utils/types/keyboard'

describe('useShortcut', () => {
  it('should call multiple binding keys', () => {
    const fn = jest.fn()
    renderHook(() =>
      useShortcut(
        {
          shift: true,
          key: 'K'
        },
        fn
      )
    )

    expect(fn).not.toHaveBeenCalled()
    window.dispatchEvent(new KeyboardEvent('keydown'))
    expect(fn).not.toHaveBeenCalled()
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        shiftKey: true,
        key: 'K'
      })
    )
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

it('should bind target with document', () => {
  const fn = jest.fn()

  renderHook(() =>
    useShortcut(
      {
        shift: true,
        key: 'K'
      },
      fn,
      { target: document }
    )
  )

  expect(fn).not.toHaveBeenCalled()
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      shiftKey: true,
      key: 'K'
    })
  )
  expect(fn).not.toHaveBeenCalled()
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      shiftKey: true,
      key: 'K'
    })
  )
  expect(fn).toHaveBeenCalled()
})

it('should re-register addEventListener when handler changed', () => {
  const fn = jest.fn()

  const { rerender } = renderHook(
    ({ fn }) =>
      useShortcut(
        {
          shift: true,
          key: 'K',
          cmd: true
        },
        fn
      ),
    {
      initialProps: {
        fn
      }
    }
  )

  expect(fn).not.toHaveBeenCalled()
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      shiftKey: true,
      key: 'K',
      metaKey: true
    })
  )
  expect(fn).toHaveBeenCalled()
  const fn2 = jest.fn()
  rerender({ fn: fn2 })
  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn2).not.toHaveBeenCalled()
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      shiftKey: true,
      key: 'K',
      metaKey: true
    })
  )
  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn2).toHaveBeenCalled()
  expect(fn2).toHaveBeenCalledTimes(1)
})

describe('validateKeyMap', () => {
  const table: [
    Record<MetaKey, boolean> & { key?: Alphabet },
    KeyboardEventInit,
    boolean
  ][] = [
    [
      {
        shift: false,
        cmd: false,
        ctrl: false,
        option: false
      },
      {},
      true
    ],
    [
      {
        shift: false,
        cmd: false,
        ctrl: false,
        option: false,
        key: 'a'
      },
      {
        key: 'a'
      },
      true
    ],
    [
      {
        shift: false,
        cmd: false,
        ctrl: false,
        option: false,
        key: 'A'
      },
      {
        key: 'a'
      },
      false
    ],
    [
      {
        shift: false,
        cmd: false,
        ctrl: false,
        option: false,
        key: 'A'
      },
      {
        key: 'A'
      },
      true
    ],
    [
      {
        shift: true,
        cmd: false,
        ctrl: false,
        option: false
      },
      {
        shiftKey: true
      },
      true
    ],
    [
      {
        shift: true,
        cmd: true,
        ctrl: false,
        option: false
      },
      {
        shiftKey: true,
        metaKey: true
      },
      true
    ],
    [
      {
        shift: true,
        cmd: true,
        ctrl: true,
        option: false
      },
      {
        shiftKey: true,
        metaKey: true,
        ctrlKey: true
      },
      true
    ],
    [
      {
        shift: true,
        cmd: true,
        ctrl: true,
        option: true
      },
      {
        shiftKey: true,
        metaKey: true,
        ctrlKey: true,
        altKey: true
      },
      true
    ],
    [
      {
        shift: true,
        cmd: true,
        ctrl: true,
        option: true
      },
      {
        shiftKey: true,
        metaKey: true,
        ctrlKey: false,
        altKey: true
      },
      false
    ],
    [
      {
        shift: true,
        cmd: true,
        ctrl: true,
        option: true,
        key: 'K'
      },
      {
        shiftKey: true,
        metaKey: true,
        ctrlKey: true,
        altKey: true,
        key: 'K'
      },
      true
    ]
  ]
  it.each(table)('', (keyMap, k, expected) => {
    expect(validateKeyMap(keyMap, new KeyboardEvent('keyboard', k))).toBe(
      expected
    )
  })
})
