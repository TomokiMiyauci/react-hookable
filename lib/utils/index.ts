import type { MaybeFn } from '@/utils/types'

/**
 * Check client-side or server-side
 *
 * @internal
 */
const isBrowser = typeof window !== 'undefined'

/**
 * Remove deprecated value
 * @param value - Any array
 * @returns New array of unique values
 *
 * @internal
 */
const uniqShallow = <T>(value: T[]): T[] => Array.from(new Set(value))

/**
 *
 * @param a - Base array
 * @param b - Target array
 * @returns Array of values not in `b` for `a`
 *
 * @internal
 */
const without = <T>(a: T[], b: T[]): T[] => {
  const _a = uniqShallow(a)
  const _b = uniqShallow(b)
  return _a.reduce((acc, cur) => {
    const hasSame = _b.some((__b) => __b === cur)

    if (!hasSame) {
      acc.push(cur)
    }
    return acc
  }, [] as T[])
}

/**
 * Return if function, return value, otherwise return as is
 * @internal
 */
const takeFn = <T>(maybeFn: MaybeFn<T>): T =>
  typeof maybeFn === 'function' ? (maybeFn as () => T)() : maybeFn

export { isBrowser, uniqShallow, without, takeFn }
