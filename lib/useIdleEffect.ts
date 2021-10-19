import { useEffect, useState } from 'react'

import type { UseEffect } from '@/shared/types'
import { useBoolean } from '@/useBoolean'
import { useConditionalEffect } from '@/useConditionalEffect'
import { useIsFirstMountRef } from '@/useIsFirstMountRef'
import { useTimeoutEffect } from '@/useTimeoutEffect'
import type { VFn } from '@/utils/types'

const userInteractions = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'wheel'
] as const
const oneMinute = 60_000

type UseIdleEffectOptions = {
  onIdle?: VFn
  onActive?: VFn
  onInteract?: VFn
  timeout?: number
  options?: AddEventListenerOptions | boolean
}

/**
 *
 * @example
 * ```tsx
 *
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-useidleeffect
 * @beta
 */
const useIdleEffect: UseEffect<UseIdleEffectOptions> = (
  {
    onIdle,
    onActive,
    onInteract,
    timeout = oneMinute,
    options = { passive: true }
  },
  deps,
  condition
) => {
  const [isIdle, { on, off }] = useBoolean()
  const [lastActivate, setLastActive] = useState(Date.now())
  const { isFirstMount } = useIsFirstMountRef()

  const fn: VFn = () => {
    setLastActive(Date.now())
    off()
  }

  useTimeoutEffect(
    {
      callback: on,
      ms: timeout
    },
    [lastActivate, timeout],
    condition
  )

  useEffect(() => {
    if (isFirstMount) return
    onInteract?.()
  }, [lastActivate])

  useEffect(() => {
    if (isFirstMount) return
    if (isIdle) {
      onIdle?.()
    } else {
      onActive?.()
    }
  }, [isIdle])

  useConditionalEffect(
    () => {
      userInteractions.forEach((type) => {
        addEventListener(type, fn, options)
      })

      return () => {
        userInteractions.forEach((type) => {
          removeEventListener(type, fn, options)
        })
      }
    },
    deps,
    condition
  )

  return isIdle
}

export { useIdleEffect }
export type { UseIdleEffectOptions }
