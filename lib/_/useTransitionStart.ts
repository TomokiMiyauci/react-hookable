import { useLayoutEffect, useEffect } from 'react'

import { onTakeTarget } from '@/shared'
import { useConditionalEffect } from '@/useConditionalEffect'
import { isBrowser } from '@/utils'

import type { UseEffect, Target } from '@/shared/types'
import type { VFn } from '@/utils/types'

const getMs = (value: string): string => {
  const regExpExecArray = /(?<num>.*)s$/.exec(value)
  if (!regExpExecArray || !regExpExecArray.groups) return ''
  return regExpExecArray.groups.num
}

const str2NumOrZero = (value: string): number => {
  const number = Number(value)
  return isNaN(number) ? 0 : number
}

const x1000 = (value: number): number => value * 1000

const cleanTime = (value: string): number => x1000(str2NumOrZero(getMs(value)))

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
    () => {
      onStart?.()
    },
    deps,
    condition,
    isBrowser ? useLayoutEffect : useEffect
  )

  useConditionalEffect(
    () => {
      onMiddle?.()

      return onTakeTarget(target, (el) => {
        const { transitionDuration, transitionDelay } = getComputedStyle(el)

        const duration = cleanTime(transitionDuration)
        const delay = cleanTime(transitionDelay)

        const id = setTimeout(() => {
          onEnd?.()
        }, duration + delay)

        return () => clearTimeout(id)
      })
    },
    deps,
    condition
  )
}

export { useTransitionStart, getMs, str2NumOrZero, x1000, cleanTime }
export type { UseTransitionTimingEffectOptions }
