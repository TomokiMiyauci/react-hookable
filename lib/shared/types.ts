import type { DependencyList, MutableRefObject, RefObject } from 'react'

import type { Maybe } from '@/utils/types'

/**
 * Types of Event loop options
 */
type EventLoopOptions = {
  /**
   * Whether to automatically clear the timeout timer when unmount
   * @defaultValue `true`
   */
  clearAuto: boolean
}

/**
 * Alias for position
 */
type Position = {
  x: number
  y: number
}

/**
 * Define effect hooks
 */
type UseEffect<T extends Record<PropertyKey, unknown>, R = void> = (
  options: T,
  deps?: DependencyList,
  condition?: () => Maybe<boolean>
) => R

/**
 * Define ref hooks
 * @typeParam T - Return hooks value with `_ref`
 */
type UseRef<
  T extends {
    _ref: RefObject<unknown> | MutableRefObject<unknown>
    [k: PropertyKey]: unknown
  }
> = () => T

/**
 * Union types of `EventTarget`
 * @typeParam T - Any `EventTarget`
 */
type Target<T extends EventTarget> = T | (() => T) | RefObject<T>

export type { EventLoopOptions, Position, Target, UseEffect, UseRef }
