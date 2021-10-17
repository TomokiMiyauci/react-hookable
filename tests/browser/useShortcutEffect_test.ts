import { act, renderHook } from '@testing-library/react-hooks'

import type { MetaKey } from '@/useShortcut'
import { Code, useShortcutEffect, validateKeyMap } from '@/useShortcutEffect'

describe('useShortcutEffect', () => {
  it('should call multiple binding keys', () => {
    const onShortcut = jest.fn()
    renderHook(() =>
      useShortcutEffect({
        keyMap: {
          shift: true,
          code: 'KeyK'
        },
        onShortcut,
        target: window
      })
    )

    expect(onShortcut).not.toHaveBeenCalled()

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown'))
    })

    expect(onShortcut).not.toHaveBeenCalled()

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', {
          shiftKey: true,
          code: 'KeyK'
        })
      )
    })
    expect(onShortcut).toHaveBeenCalledTimes(1)
  })

  it('should bind target with document', () => {
    const onShortcut = jest.fn()

    renderHook(() =>
      useShortcutEffect({
        keyMap: {
          shift: true,
          code: 'KeyK'
        },
        onShortcut,
        target: document
      })
    )

    expect(onShortcut).not.toHaveBeenCalled()

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        shiftKey: true,
        code: 'KeyK'
      })
    )
    expect(onShortcut).not.toHaveBeenCalled()
    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        shiftKey: true,
        code: 'KeyK'
      })
    )
    expect(onShortcut).toHaveBeenCalled()
  })

  it('should bind multiple shortcut', () => {
    const onShortcut = jest.fn()

    renderHook(() =>
      useShortcutEffect({
        keyMap: {
          shift: true,
          code: 'KeyK',
          cmd: true
        },
        onShortcut
      })
    )

    expect(onShortcut).not.toHaveBeenCalled()

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', {
          shiftKey: true,
          code: 'KeyK',
          metaKey: true
        })
      )
    })
    expect(onShortcut).toHaveBeenCalledTimes(1)
  })
})

describe('validateKeyMap', () => {
  const table: [
    Record<MetaKey, boolean> & { code?: Code },
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
        code: 'KeyA'
      },
      {
        code: 'KeyA'
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
        code: 'KeyK'
      },
      {
        shiftKey: true,
        metaKey: true,
        ctrlKey: true,
        altKey: true,
        code: 'KeyK'
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
