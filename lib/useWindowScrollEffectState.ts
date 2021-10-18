import { useState } from 'react'

import type { UseEffectSimple } from '@/shared/types'
import { useEventListenerEffect } from '@/useEventListenerEffect'
import { isBrowser } from '@/utils'

type UseWindowScrollEffectStateOptions = {
  /**
   * `addEventListener` options
   */
  options?: AddEventListenerOptions | boolean
}

type WindowState = Pick<Window, 'scrollX' | 'scrollY'>
// eslint-disable-next-line @typescript-eslint/ban-types
type WindowStateUpdater = {}
type UseWindowScrollEffectStateReturn = [WindowState, WindowStateUpdater]

/**
 * Reactive `window` scroll state
 * @param options - window scroll options
 * @param deps - If present, effect will only activate if the values in the list change.
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @example
 * ```tsx
 * const [{ scrollX, scrollY }] = useWindowScrollEffectState()
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effectstate-usewindowscrolleffectstate
 * @beta
 */
const useWindowScrollEffectState: UseEffectSimple<
  UseWindowScrollEffectStateOptions,
  UseWindowScrollEffectStateReturn
> = (options, deps, condition) => {
  const [state, setState] = useState<WindowState>(() => {
    if (!isBrowser) {
      return {
        scrollX: 0,
        scrollY: 0
      }
    }
    return {
      scrollX,
      scrollY
    }
  })
  useEventListenerEffect(
    {
      target: () => window,
      type: 'scroll',
      listener: () =>
        setState({
          scrollX,
          scrollY
        }),
      options: options?.options
    },
    deps,
    condition
  )

  return [state, {}]
}

export { useWindowScrollEffectState }
export type {
  UseWindowScrollEffectStateOptions,
  UseWindowScrollEffectStateReturn,
  WindowState,
  WindowStateUpdater
}
