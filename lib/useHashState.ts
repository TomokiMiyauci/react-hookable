/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, useMemo, useState } from 'react'

import { useEventListenerEffect } from '@/useEventListenerEffect'
import { isBrowser } from '@/utils'
const formatHash = (value: string): string => {
  if (value === '') return ' '
  return value.startsWith('#') ? value : `#${value}`
}

const initializer = (value?: string | (() => string)): string => {
  if (!isBrowser) return ''
  const _value =
    typeof value === 'undefined'
      ? undefined
      : typeof value === 'string'
      ? value
      : value()
  if (typeof _value === 'string') {
    window.history.replaceState(null, document.title, formatHash(_value))
  }
  return window.location.hash
}

/**
 * Tracks location hash value
 * @param initialState - Set the URL hash to `initialState`
 * @param options - Hash options
 * @returns A stateful value, and a functions to update URL hash
 *
 * @example
 * ```tsx
 * const [hash, setHash] = useHashState()
 * setHash('searching')
 * // URL: http~/#searching
 * // hash: #searching
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/stateset-usehash
 * @deprecated 1.0.0-beta.28
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useHashState = <T extends boolean = true>(
  initialState?: ('' | (string & {})) | (() => '' | (string & {})),
  options?: { hashMark: T }
) => {
  const hashMark = options?.hashMark ?? true
  const [state, setState] = useState<string>(initializer(initialState))

  const onHashChange = useCallback(() => setState(window.location.hash), [])

  const setHash = useCallback(
    (newHash: '' | (string & {})) => {
      const formalHash = formatHash(newHash)
      if (formalHash === state) return
      window.history.replaceState(null, document.title, formalHash)
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    },
    [state]
  )

  useEventListenerEffect(
    {
      target: () => window,
      type: 'hashchange',
      listener: onHashChange
    },
    []
  )

  const hash = useMemo<
    '' | (T extends true ? `#${string}` : string & {})
  >(() => {
    return (hashMark ? state : state.replace('#', '')) as
      | ''
      | (T extends true ? `#${string}` : string & {})
  }, [state, hashMark])

  return [hash, setHash] as const
}

export { formatHash, initializer, useHashState }
