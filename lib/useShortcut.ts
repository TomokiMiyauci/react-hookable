import type { DependencyList } from 'react'

import { useEventListener } from '@/useEventListener'
import type { Alphabet } from '@/utils/types/keyboard'

const validateKeyMap = (
  {
    option,
    shift,
    cmd,
    ctrl,
    key: _key
  }: // eslint-disable-next-line @typescript-eslint/ban-types
  Record<MetaKey, boolean> & Partial<{ key: Keys }>,
  { altKey, shiftKey, metaKey, ctrlKey, key }: KeyboardEvent
): boolean => {
  if (
    altKey !== option ||
    shiftKey !== shift ||
    metaKey !== cmd ||
    ctrlKey !== ctrl
  )
    return false
  return (
    typeof _key === 'undefined' || (typeof _key === 'string' && _key === key)
  )
}

type MetaKeyMap = {
  ctrl: 'ctrlKey'
  cmd: 'metaKey'
  option: 'altKey'
  shift: 'shiftKey'
}

type MetaKey = keyof MetaKeyMap

type Keys =
  | Alphabet
  | 'Escape'
  | 'Enter'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowRight'
  | 'ArrowLeft'

/**
 * Hooks for `keydown` shortcut dispatcher
 * @param keyMap - Binding shortcut key
 * @param onKeyDown - Fire on keydown shortcut
 * @param options - EventListener options and binding [`target` default:`window`]
 * @param deps - If present, effect will only activate if the values in the list change
 *
 * @example
 * ```ts
 * useShortcut({ shift: true, key: 'K' }, () => alert('shirt+K keydown'))
 * ```
 */
const useShortcut = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  keyMap: Partial<Record<MetaKey, true> & { key: Keys }>,
  onKeyDown: (ev: KeyboardEvent) => void,
  options?: {
    target?:
      | Window
      | Document
      | HTMLElement
      | (() => Window | Document | HTMLElement)
  } & AddEventListenerOptions,
  deps?: DependencyList
): void => {
  useEventListener(
    options?.target ?? (() => window),
    'keydown',
    (ev) => {
      const {
        key: _key,
        option = false,
        shift = false,
        cmd = false,
        ctrl = false
      } = keyMap

      if (
        validateKeyMap(
          {
            option,
            shift,
            cmd,
            ctrl,
            key: _key
          },
          ev
        )
      ) {
        onKeyDown(ev)
      }
    },
    options,
    deps
  )
}

export { useShortcut, validateKeyMap }
export type { MetaKey }
