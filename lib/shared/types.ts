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

export type { EventLoopOptions, Position }
