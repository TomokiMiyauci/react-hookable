import { useLayoutEffect, useEffect } from 'react'

import { useConditionalEffect } from '@/useConditionalEffect'
import { useEventListenerEffect } from '@/useEventListenerEffect'
import { isBrowser } from '@/utils'

import type { UseEffect, Target } from '@/shared/types'
import type { VFn } from '@/utils/types'

type UseTransitionTimingEffectOptions = {
  onStart?: VFn
  onMiddle?: VFn
  onEnd?: VFn
  target: Target<HTMLElement | SVGElement>
}

/**
 * @internal
 */
const useTransitionStart: UseEffect<UseTransitionTimingEffectOptions> = (
  { onStart, onMiddle, onEnd, target },
  deps,
  condition
) => {
  useConditionalEffect(
    () => onStart?.(),
    deps,
    condition,
    isBrowser ? useLayoutEffect : useEffect
  )

  useConditionalEffect(() => onMiddle?.(), deps, condition)

  useEventListenerEffect(
    {
      target,
      type: 'transitionend',
      listener: () => onEnd?.()
    },
    deps,
    condition
  )
}

export { useTransitionStart }
export type { UseTransitionTimingEffectOptions }
