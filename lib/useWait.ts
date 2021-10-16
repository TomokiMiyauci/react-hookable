import type { UseTimeoutReturn } from '@/useTimeout'
import { useTimeout } from '@/useTimeout'

type UseWaitReturn = {
  use: (ms: number) => Promise<void>
  _ref: UseTimeoutReturn['_ref']
}

/**
 * Safe process wait
 * @returns Procedure wait function of `use`
 *
 * @example
 * ```tsx
 * const { use } = useWait()
 * const handleClick = async () => {
 *   await use(1000)
 *   doSomething()
 * }
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/procedure-usewait
 * @deprecated 1.0.0-beta.28
 */
const useWait = (): UseWaitReturn => {
  const { use: _use, _ref } = useTimeout()

  const use = async (ms: number): Promise<void> =>
    new Promise((resolve) => _use(resolve, ms))
  return {
    use,
    _ref
  }
}

export { useWait }
export type { UseWaitReturn }
