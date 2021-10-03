/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DependencyList } from 'react'
import { useEffect } from 'react'

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

/**
 * Register using addEventListener on mount, and removeEventListener automatically on unmount.
 * @param target - Target of `addEventListener`
 * @param type - Event type
 * @param listener - Call on fire event
 * @param options - EventListener options
 * @param deps -  If present, effect will only activate if the values in the list change.
 */
const useEventListener = <T extends EventTarget, K extends keyof EventMap<T>>(
  target: T,
  type: IsNever<K> extends true ? string : K,
  listener: (
    this: T,
    ev: IsNever<EventMap<T>> extends true ? Event : EventMap<T>[K]
  ) => any,
  options?: AddEventListenerOptions | boolean,
  deps?: DependencyList
): void => {
  useEffect(() => {
    target.addEventListener(type as any, listener as any, options)

    return () =>
      target.removeEventListener(type as any, listener as any, options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, type, listener, options, ...(deps ?? [])])
}

export { useEventListener }
export type { EventMap }
