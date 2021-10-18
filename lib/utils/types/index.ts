/**
 * Alias for `void` function
 */
type VFn = () => void

/**
 * Union types of `undefined`
 */
type Maybe<T> = T | undefined

/**
 * Utility for record value to union typeof `undefined`
 */
type MaybeRecord<T extends Record<PropertyKey, unknown>> = {
  [k in keyof T]: Maybe<T[k]>
}

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

type valueOf<T> = T[keyof T]

type Rename<
  T extends Record<PropertyKey, unknown>,
  K extends Record<string, keyof T>
> = {
  [t in keyof Omit<T, valueOf<K>>]: T[t]
} & {
  [k in keyof Pick<T, keyof K>]: T[K[k]]
}

export type { AnyFn, ClearOptions, IsNever, Maybe, MaybeRecord, Rename, VFn }
