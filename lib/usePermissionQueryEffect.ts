import { useEffect, useState } from 'react'

import type { UseEffect } from '@/shared/types'
import { useConditionalEffect } from '@/useConditionalEffect'
import { useIsUnmounted } from '@/useIsUnmounted'
import { VFn } from '@/utils/types'

type DescriptorNamePolyfill =
  | 'accelerometer'
  | 'accessibility-events'
  | 'ambient-light-sensor'
  | 'background-sync'
  | 'camera'
  | 'clipboard-read'
  | 'clipboard-write'
  | 'gyroscope'
  | 'magnetometer'
  | 'microphone'
  | 'midi'
  | 'payment-handler'
  | 'speaker'

type DescriptorName = PermissionName | DescriptorNamePolyfill

type UsePermissionQueryEffectOptions = {
  /**
   * Name of querying permission
   */
  permission: DescriptorName

  /**
   * Called if the status of permission is `granted`
   */
  onGranted?: VFn

  /**
   * Called if the status of permission is `prompt`
   */
  onPrompt?: VFn

  /**
   * Called if the status of permission is `denied`
   */
  onDenied?: VFn

  /**
   * Called if permissions are not supported or if permissions query is not supported
   */
  onNotSupported?: (e: TypeError) => void
}

/**
 * Effect for `navigator.permissions.query` with declarative
 * @example
 * ```tsx
 * usePermissionQueryEffect({
 *   permission: 'camera',
 *   onGranted: () => {
 *     // permission is granted
 *   },
 *   onPrompt: () => {
 *     // permission is prompt
 *   },
 *   onDenied: () => {
 *     // permission is denied
 *   },
 *   onNotSupported: () => {
 *     // Called if permissions are not supported or if permissions query is not supported
 *   }
 * })
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-usepermissionqueryeffect
 * @beta
 */
const usePermissionQueryEffect: UseEffect<UsePermissionQueryEffectOptions> = (
  { permission, onDenied, onGranted, onPrompt, onNotSupported },
  deps,
  condition
) => {
  const [permissionState, setPermissionState] = useState<PermissionState>()
  const [error, setError] = useState<TypeError>()
  const isUnmounted = useIsUnmounted()

  useEffect(() => {
    if (!permissionState) return
    switch (permissionState) {
      case 'granted': {
        onGranted?.()
        break
      }
      case 'prompt': {
        onPrompt?.()
        break
      }
      case 'denied': {
        onDenied?.()
        break
      }
    }
  }, [permissionState, onGranted, onPrompt, onDenied])

  useEffect(() => {
    if (!error) return
    onNotSupported?.(error)
  }, [error, onNotSupported])

  useConditionalEffect(
    () => {
      const isSupported = navigator && 'permissions' in navigator
      if (!isSupported) {
        setError(TypeError('Not supported'))
        return
      }

      navigator.permissions
        .query({ name: permission as PermissionName })
        .then(({ state }) => {
          if (isUnmounted.current) return
          setPermissionState(state)
        })
        .catch((e: TypeError) => {
          if (isUnmounted.current) return
          setError(e)
        })
    },
    deps,
    condition
  )
}

export { usePermissionQueryEffect }
export type { DescriptorName, UsePermissionQueryEffectOptions }
