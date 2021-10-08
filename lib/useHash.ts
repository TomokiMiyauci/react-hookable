/* eslint-disable @typescript-eslint/ban-types */
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useEventListener } from '@/useEventListener'
import { isBrowser } from '@/utils'

const formatHash = (value: string): string =>
  value === '' || value.startsWith('#') ? value : `#${value}`

const initializer = (value?: string | (() => string)): string => {
  if (!isBrowser) return ''
  const _value =
    typeof value === 'undefined'
      ? undefined
      : typeof value === 'string'
      ? value
      : value()
  if (_value) {
    window.location.hash = _value
  }
  return _value ? formatHash(_value) : window.location.hash
}

/**
 * Tracks location hash value
 * @param initialState - Set the URL hash to `initialState`
 * @param options - Hash options
 * @returns A stateful value, and a functions to update URL hash
 *
 * @example
 * ```tsx
 * const [hash, setHash] = useHash()
 * setHash('searching')
 * // URL: http~/#searching
 * // hash: #searching
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/state-usehash
 * @beta
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useHash = <T extends boolean = false>(
  initialState?: string | (() => string),
  options?: { trimHash: T }
) => {
  const trimHash = options?.trimHash ?? false
  const [state, setState] = useState<string>(initializer(initialState))

  const onHashChange = useCallback(() => setState(window.location.hash), [])

  const setHash = useCallback(
    (newHash: string) => {
      if (newHash === state) return
      window.location.hash = newHash
    },
    [state]
  )

  const { add } = useEventListener()

  useEffect(() => {
    add(window, 'hashchange', onHashChange)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hash = useMemo<
    '' | (T extends true ? string & {} : `#${string}`)
  >(() => {
    return (trimHash ? state.replace('#', '') : state) as
      | ''
      | (T extends true ? string & {} : `#${string}`)
  }, [state, trimHash])

  return [hash, setHash] as const
}

export { formatHash, initializer, useHash }
