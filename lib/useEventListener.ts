/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'

import { DEFAULT_CLEAR_OPTIONS } from '@/utils/constants'
import type { ClearOptions } from '@/utils/types'
import type { IsNever, VFn } from '@/utils/types'

type EventMap<T extends EventTarget> = T extends HTMLElement
  ? HTMLElementEventMap
  : T extends Element
  ? ElementEventMap
  : T extends Document
  ? DocumentEventMap
  : T extends Window
  ? WindowEventMap
  : never

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
const useEventListener = ({
  clearAuto
}: ClearOptions = DEFAULT_CLEAR_OPTIONS) => {
  const ref = useRef<
    [
      EventTarget,
      string,
      EventListenerOrEventListenerObject,
      AddEventListenerOptions | boolean | undefined
    ][]
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
    ref.current.push([_target, type as string, listener as any, options])
  }

  useEffect(() => {
    return () => {
      if (clearAuto) {
        remove()
      }
    }
  }, [clearAuto])

  const remove: VFn = () => {
    ref.current.forEach(([target, type, listener, options]) => {
      target.removeEventListener(type as any, listener as any, options)
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
