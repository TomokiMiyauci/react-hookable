/**
 * Check client-side or server-side
 */
const isBrowser = typeof window !== 'undefined'

const duplicate = <T>(value: T[]): T[] => Array.from(new Set(value))

export { isBrowser, duplicate }
