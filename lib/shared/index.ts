import { useEffect, useLayoutEffect } from 'react'

import { uniqShallow, isBrowser, takeFn } from '@/utils'

import type { Target } from '@/shared/types'
import type { RefObject } from 'react'

/**
 * Safe current accessor
 * @param maybeRef - Ref object or any `Record`
 * @returns ref.current or `Record` or `null`
 *
 * @example
 * ```ts
 * const ref = createRef()
 * takeCurrent(ref) // null
 *
 * takeCurrent({}) // {}
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const takeCurrent = <T extends Record<PropertyKey, any>>(
  maybeRef: T | RefObject<T>
): T | null => {
  if ('current' in maybeRef) {
    return maybeRef.current
  }
  return maybeRef
}

/**
 * Safe target accessor
 * @param target - Any `EventTarget` that return or wrapped ref
 * @returns pure target
 * @example
 * ```ts
 * takeTarget(window) // window
 * takeTarget(() => document) // document
 * const ref = useRef<HTMLDivElement>(null)
 * takeTarget(ref) // HTMLDivElement or null
 * ```
 */
const takeTarget = <T extends EventTarget>(target: Target<T>): T | null => {
  const current = takeCurrent(target)

  return takeFn(current)
}

/**
 * Called when target is not `undefined`
 * @param target - Any target
 * @param onTake - Called when success to take out target inner event target
 * @returns void
 *
 * @internal
 */
const onTakeTarget = <T extends EventTarget>(
  target: Target<T>,
  onTake: (el: T) => void
): void => {
  const el = takeTarget(target)
  if (!el) return
  onTake(el)
}

/**
 * Split `className` and remove duplicate
 * @param className - Any className
 * @returns Clean `className` array
 */
const cleanSplittedClassName = (className: string): string[] => {
  const splittedClassName = className
    .trim()
    .split(' ')
    .filter(({ length }) => length)

  return uniqShallow(splittedClassName)
}

const useUniversalEffect = isBrowser ? useLayoutEffect : useEffect

export {
  takeCurrent,
  takeTarget,
  cleanSplittedClassName,
  useUniversalEffect,
  onTakeTarget
}
