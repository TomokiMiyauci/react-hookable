import { useEventListener } from '@/useEventListener'
import type { ClearOptions } from '@/utils/types'
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
 * @param options - Clear options
 * @returns Shortcut binder set of `bind` and `unbind` functions
 *
 * @example
 * ```ts
 * const { bind, unbind } = useShortcut()
 * useEffect(() => {
 *   bind({ cmd: true, key: 'k' }, () => alert('command -> K keydown at window'))
 * }, [])
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/stateless-useshortcut
 * @beta
 */

const useShortcut = (
  options?: ClearOptions
): {
  bind: (
    keyMap: Partial<Record<MetaKey, true> & { key: Keys }>,
    onKeyDown: (ev: KeyboardEvent) => void,
    options?: {
      target?:
        | Window
        | Document
        | HTMLElement
        | (() => Window | Document | HTMLElement)
    }
  ) => void
  unbind: ReturnType<typeof useEventListener>['remove']
  _ref: ReturnType<typeof useEventListener>['_ref']
} => {
  const { add, remove, _ref } = useEventListener(options)

  const bind = (
    keyMap: Partial<Record<MetaKey, true> & { key: Keys }>,
    onKeyDown: (ev: KeyboardEvent) => void,
    options?: {
      target?:
        | Window
        | Document
        | HTMLElement
        | (() => Window | Document | HTMLElement)
    } & AddEventListenerOptions
  ): void => {
    const {
      key: _key,
      option = false,
      shift = false,
      cmd = false,
      ctrl = false
    } = keyMap
    const target = options?.target ?? (() => window)

    add(
      target,
      'keydown',
      (ev) => {
        const isValidKeyMap = validateKeyMap(
          {
            option,
            shift,
            cmd,
            ctrl,
            key: _key
          },
          ev
        )
        if (!isValidKeyMap) return
        onKeyDown(ev)
      },
      options
    )
  }

  return { bind, unbind: remove, _ref }
}

export { useShortcut, validateKeyMap }
export type { MetaKey }
