import type { Target, UseEffect } from '@/shared/types'
import { useEventListenerEffect } from '@/useEventListenerEffect'
import type { UpperCase } from '@/utils/types/keyboard'
const validateKeyMap = (
  {
    option,
    shift,
    cmd,
    ctrl,
    code: _code
  }: // eslint-disable-next-line @typescript-eslint/ban-types
  Record<MetaKey, boolean> & Partial<{ code: Code }>,
  { altKey, shiftKey, metaKey, ctrlKey, code }: KeyboardEvent
): boolean => {
  if (
    altKey !== option ||
    shiftKey !== shift ||
    metaKey !== cmd ||
    ctrlKey !== ctrl
  )
    return false
  return typeof _code === 'undefined' || _code === code
}

type Code =
  | `Key${UpperCase}`
  | 'Escape'
  | 'Enter'
  | 'Space'
  | 'Backspace'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowRight'
  | 'ArrowLeft'
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {})

type MetaKeyMap = {
  ctrl: 'ctrlKey'
  cmd: 'metaKey'
  option: 'altKey'
  shift: 'shiftKey'
}

type MetaKey = keyof MetaKeyMap

type UseShortcutEffectOptions = {
  /**
   * Shortcut bind key map
   */
  keyMap: Partial<Record<MetaKey, true> & { code: Code }>

  /**
   * Fire on keydown shortcut keys
   */
  onShortcut: (ev: KeyboardEvent) => void

  /**
   * Target of attaching event listener
   */
  target?: Target<Window | Document | HTMLElement | SVGElement>

  /**
   * `addEventLister` options
   */
  options?: AddEventListenerOptions | boolean
}

/**
 * Effect for `keydown` as shortcut
 * @param options - Shortcut options
 * @param deps - If present, effect will only activate if the values in the list change.
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 *
 * @example
 * ```ts
 * useShortcutEffect(
 *   {
 *     keyMap: {
 *       cmd: true,
 *       code: 'KeyK'
 *     },
 *     onShortcut: SyncFn
 *   },
 *   []
 * )
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-useshortcuteffect
 * @beta
 */
const useShortcutEffect: UseEffect<UseShortcutEffectOptions> = (
  { keyMap, onShortcut, target = () => window, options },
  deps,
  condition
) => {
  useEventListenerEffect(
    {
      target,
      type: 'keydown',
      listener: (ev) => {
        const {
          code,
          option = false,
          shift = false,
          cmd = false,
          ctrl = false
        } = keyMap
        const isValidKeyMap = validateKeyMap(
          {
            option,
            shift,
            cmd,
            ctrl,
            code
          },
          ev
        )
        if (!isValidKeyMap) return
        onShortcut(ev)
      },
      options
    },
    deps,
    condition
  )
}

export { useShortcutEffect, validateKeyMap }
export type { Code, MetaKey }
