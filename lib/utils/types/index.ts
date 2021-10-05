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

export type { AnyFn, Maybe, VFn }
