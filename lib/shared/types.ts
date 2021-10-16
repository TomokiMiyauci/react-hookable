import type { DependencyList } from 'react'

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
 * Define effect
 */
type UseEffect<T extends Record<PropertyKey, unknown>, R = void> = (
  options: T,
  deps?: DependencyList,
  condition?: () => Maybe<boolean>
) => R

export type { EventLoopOptions, Position, UseEffect }
