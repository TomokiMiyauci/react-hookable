import { useLayoutEffect } from 'react'

import { useConditionalEffect } from '@/useConditionalEffect'
import { useEventListenerEffect } from '@/useEventListenerEffect'

import type { UseEffect } from '@/shared/types'
import type { VFn } from '@/utils/types'
import type { RefObject } from 'react'

type UseTransitionTimingEffectOptions = {
  onStart?: VFn
  onMiddle?: VFn
  onEnd?: VFn
  target: RefObject<HTMLElement | SVGElement>
}

/**
 * @internal
 */
const useTransitionStart: UseEffect<UseTransitionTimingEffectOptions> = (
  { onStart, onMiddle, onEnd, target },
  deps,
  condition
) => {
  useConditionalEffect(() => onStart?.(), deps, condition, useLayoutEffect)

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
