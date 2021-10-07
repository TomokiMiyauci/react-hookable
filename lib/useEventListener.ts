/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'

import type { VFn } from '@/utils/types'
type IsNever<T> = [T] extends [never] ? true : false
type EventMap<T> = T extends HTMLElement
  ? HTMLElementEventMap
  : T extends Element
  ? ElementEventMap
  : T extends Document
  ? DocumentEventMap
  : T extends Window
  ? WindowEventMap
  : never

type UseEventListenerOptions = {
  cleanAuto: boolean
}

/**
 * Returns a set of event listeners `add` and `remove` functions that can be called anywhere.
 *
 * The event listeners will automatically be removed on unmount.
 * @param options - Hooks options
 * @returns A set of event listener register and remover
 *
 * @example
 * ```tsx
 * const { add } = useEventListener()
 * // Event listeners registered with the `add` function will be automatically removed when unmounted
 * useEffect(() => {
 *  add(window, 'mousemove', anyFn)
 * }, [])
 *
 * const handleClick = () => {
 *  add(document, 'resize', anyFn)
 * }
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/utility-useeventlistener
 * @beta
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEventListener = (
  { cleanAuto }: UseEventListenerOptions = { cleanAuto: true }
) => {
  const ref = useRef<
    [EventTarget, string, EventListenerOrEventListenerObject][]
  >([])

  const add = <T extends EventTarget, K extends keyof EventMap<T>>(
    target: T | (() => T),
    type: IsNever<K> extends true ? string : K,
    listener: (
      this: T,
      ev: IsNever<EventMap<T>> extends true ? Event : EventMap<T>[K]
    ) => any,
    options?: AddEventListenerOptions | boolean
  ): void => {
    const _target = typeof target === 'function' ? target() : target

    _target.addEventListener(type as any, listener as any, options)
    ref.current.push([_target, type as string, listener as any])
  }

  useEffect(() => {
    return () => {
      if (cleanAuto) {
        remove()
      }
    }
  }, [cleanAuto])

  const remove: VFn = () => {
    ref.current.forEach(([target, type, listener]) => {
      target.removeEventListener(type as any, listener as any)
    })
    ref.current = []
  }

  return {
    add,
    remove,
    _ref: ref
  }
}

export { useEventListener }

export type { EventMap }
