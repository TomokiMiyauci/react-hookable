/**
 * Check client-side or server-side
 */
const isBrowser = typeof window !== 'undefined'

const uniqShallow = <T>(value: T[]): T[] => Array.from(new Set(value))

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

export { isBrowser, uniqShallow, without }
