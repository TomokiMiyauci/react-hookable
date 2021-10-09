import { act, renderHook } from '@testing-library/react-hooks'

import type { MetaKey } from '@/useShortcut'
import { useShortcut, validateKeyMap } from '@/useShortcut'
import type { Alphabet } from '@/utils/types/keyboard'

describe('useShortcut', () => {
  it('should call multiple binding keys', () => {
    const fn = jest.fn()
    const {
      result: {
        current: { bind }
      }
    } = renderHook(() => useShortcut())

    expect(fn).not.toHaveBeenCalled()

    act(() => {
      bind(
        {
          shift: true,
          key: 'k'
        },
        fn
      )
    })

    window.dispatchEvent(new KeyboardEvent('keydown'))
    expect(fn).not.toHaveBeenCalled()
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        shiftKey: true,
        key: 'k'
      })
    )
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

it('should bind target with document', () => {
  const fn = jest.fn()

  const {
    result: {
      current: { bind }
    }
  } = renderHook(() => useShortcut())

  expect(fn).not.toHaveBeenCalled()

  act(() => {
    bind(
      {
        shift: true,
        key: 'K'
      },
      fn,
      { target: document }
    )
  })
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

it('should bind multiple shortcut', () => {
  const onKeyDown = jest.fn()
  const onKeyDown2 = jest.fn()

  const {
    result: {
      current: { bind }
    }
  } = renderHook(() => useShortcut())

  expect(onKeyDown).not.toHaveBeenCalled()

  act(() => {
    const keyMap = {
      shift: true,
      key: 'K',
      cmd: true
    } as const
    bind(keyMap, onKeyDown)
    bind(keyMap, onKeyDown2, { target: document })
  })
  const keyboardEvent = new KeyboardEvent('keydown', {
    shiftKey: true,
    key: 'K',
    metaKey: true
  })
  window.dispatchEvent(keyboardEvent)
  document.dispatchEvent(keyboardEvent)
  expect(onKeyDown).toHaveBeenCalledTimes(1)
  expect(onKeyDown2).toHaveBeenCalledTimes(1)
})

it('should unbind when call unbind', () => {
  const onKeyDown = jest.fn()

  const {
    result: {
      current: { bind, unbind, _ref }
    }
  } = renderHook(() => useShortcut())

  expect(onKeyDown).not.toHaveBeenCalled()
  expect(_ref.current).toHaveLength(0)
  act(() => {
    const keyMap = {
      shift: true,
      key: 'K',
      cmd: true
    } as const
    bind(keyMap, onKeyDown)
  })
  const keyboardEvent = new KeyboardEvent('keydown', {
    shiftKey: true,
    key: 'K',
    metaKey: true
  })
  window.dispatchEvent(keyboardEvent)
  expect(onKeyDown).toHaveBeenCalledTimes(1)
  expect(_ref.current).toHaveLength(1)

  act(unbind)
  window.dispatchEvent(keyboardEvent)
  expect(onKeyDown).toHaveBeenCalledTimes(1)
  expect(_ref.current).toHaveLength(0)
})

it('should unbind all shortcut when call unbind', () => {
  const onKeyDown = jest.fn()

  const {
    result: {
      current: { bind, unbind, _ref }
    }
  } = renderHook(() => useShortcut())

  expect(onKeyDown).not.toHaveBeenCalled()
  expect(_ref.current).toHaveLength(0)
  act(() => {
    const keyMap = {
      shift: true,
      key: 'K',
      cmd: true
    } as const
    bind(keyMap, onKeyDown)
    bind(keyMap, onKeyDown, { target: document })
  })
  const keyboardEvent = new KeyboardEvent('keydown', {
    shiftKey: true,
    key: 'K',
    metaKey: true
  })
  window.dispatchEvent(keyboardEvent)
  document.dispatchEvent(keyboardEvent)
  expect(onKeyDown).toHaveBeenCalledTimes(2)
  expect(_ref.current).toHaveLength(2)

  act(unbind)
  window.dispatchEvent(keyboardEvent)
  document.dispatchEvent(keyboardEvent)

  expect(onKeyDown).toHaveBeenCalledTimes(2)
  expect(_ref.current).toHaveLength(0)
})

it('should not unbind when pass clear option is false', () => {
  const onKeyDown = jest.fn()

  const {
    result: {
      current: { bind }
    },
    unmount
  } = renderHook(() => useShortcut({ clearAuto: false }))

  expect(onKeyDown).not.toHaveBeenCalled()

  act(() => {
    const keyMap = {
      shift: true,
      key: 'K',
      cmd: true
    } as const
    bind(keyMap, onKeyDown)
  })
  const keyboardEvent = new KeyboardEvent('keydown', {
    shiftKey: true,
    key: 'K',
    metaKey: true
  })
  window.dispatchEvent(keyboardEvent)
  expect(onKeyDown).toHaveBeenCalledTimes(1)
  unmount()
  window.dispatchEvent(keyboardEvent)
  expect(onKeyDown).toHaveBeenCalledTimes(2)
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
