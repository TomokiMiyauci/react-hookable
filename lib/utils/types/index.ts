/**
 * Alias for `void` function
 */
type VFn = () => void

/**
 * Union types of `undefined`
 */
type Maybe<T> = T | undefined

/**
 * Union types of function
 */
type MaybeFn<T> = T | (() => T)

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

/**
 * Mark optional field
 * @typeParam T - Any record
 * @typeParam U - The key want to optional
 */
type Optional<T extends Record<PropertyKey, unknown>, U extends keyof T> = {
  [k in keyof Omit<T, U>]: T[k]
} & {
  [k in U]?: T[k]
}

type CapitalCase<T extends string> = T extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : T

export type {
  AnyFn,
  ClearOptions,
  IsNever,
  Maybe,
  MaybeRecord,
  Optional,
  Rename,
  VFn,
  MaybeFn,
  CapitalCase
}
