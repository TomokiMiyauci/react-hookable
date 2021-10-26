import { useRef, useLayoutEffect, useEffect } from 'react'

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
  const has = useRef<boolean>(false)

  useConditionalEffect(
    () => onStart?.(),
    deps,
    condition,
    isBrowser ? useLayoutEffect : useEffect
  )

  const safeCall = (callback?: VFn): void => {
    if (has.current) return
    try {
      callback?.()
    } finally {
      has.current = true
    }
  }

  useEffect(() => {
    has.current = false
  }, deps)

  useConditionalEffect(() => onMiddle?.(), deps, condition)

  useEventListenerEffect(
    {
      target,
      type: 'transitionend',
      listener: () => safeCall(onEnd)
    },
    deps,
    condition
  )
}

export { useTransitionStart }
export type { UseTransitionTimingEffectOptions }
