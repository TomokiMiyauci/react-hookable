import { useEffect, useState } from 'react'

import { useBoolean } from '@/useBoolean'
import { useEventListenerEffect } from '@/useEventListenerEffect'
import { useIsFirstMountRef } from '@/useIsFirstMountRef'
import { useTimeoutEffect } from '@/useTimeoutEffect'

import type { UseEffect } from '@/shared/types'
import type { VFn } from '@/utils/types'

const userInteractions: (keyof WindowEventMap)[] = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'wheel'
]
const oneMinute = 60_000

type UseIdleEffectOptions = {
  /**
   * Called the first time the `timeout` period has been exceeded
   */
  onIdle?: VFn

  /**
   * Called the first time there is user activity after an Idle
   */
  onActive?: VFn

  /**
   * Called every time there is user activity
   */
  onInteract?: VFn

  /**
   * User activity timeout
   * @defaultValue 60000 ms
   */
  timeout?: number
  /**
   * Events that listen to for detected user activity
   * @defaultValue ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
   */
  events?: (keyof WindowEventMap)[]
  options?: AddEventListenerOptions | boolean
}

/**
 * Effect for track whether the user is being inactive
 * @param options - Idle options
 * @param deps - If present, effect will only activate if the values in the list change.
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @example
 * ```tsx
 * useIdleEffect({
 *   onIdle: () => {
 *     // call on Idle
 *   },
 *   onActive: () => {
 *     // call on active from idle
 *   },
 *   onInteract: () => {
 *     // call on user interaction
 *   }
 * })
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
    events = userInteractions,
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

  const listeners = events.map((type) => ({
    type,
    listener: fn,
    options
  }))

  useEventListenerEffect(
    {
      target: () => window,
      listeners
    },
    deps,
    condition
  )
}

export { oneMinute, useIdleEffect, userInteractions }
export type { UseIdleEffectOptions }
