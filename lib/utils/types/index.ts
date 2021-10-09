/**
 * Alias for `void` function
 */
type VFn = () => void

/**
 * Union types of `undefined`
 */
type Maybe<T> = T | undefined

/**
 * Alias for any function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFn<T = any, U = unknown> = (...args: T[]) => U

/**
 * Utility types for is `never`
 */
type IsNever<T> = [T] extends [never] ? true : false

/**
 * Clear options
 */
type ClearOptions = {
  clearAuto: boolean
}

export type { AnyFn, ClearOptions, IsNever, Maybe, VFn }
