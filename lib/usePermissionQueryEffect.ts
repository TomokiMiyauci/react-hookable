import { useEffect } from 'react'

import { useConditionalEffect } from '@/useConditionalEffect'
import { useSafeState } from '@/useSafeState'

import type { UseEffect } from '@/shared/types'
import type { VFn } from '@/utils/types'

const isSupported = (): boolean => navigator && 'permissions' in navigator

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
  const [permissionState, setPermissionState] = useSafeState<PermissionState>()
  const [error, setError] = useSafeState<TypeError>()

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
      if (!isSupported()) {
        setError(TypeError('Not supported'))
        return
      }

      navigator.permissions
        .query({ name: permission as PermissionName })
        .then(({ state }) => setPermissionState(state))
        .catch((e: TypeError) => setError(e))
    },
    deps,
    condition
  )
}

export { isSupported, usePermissionQueryEffect }
export type { DescriptorName, UsePermissionQueryEffectOptions }
