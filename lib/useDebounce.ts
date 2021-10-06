import type { UseTimeoutOptions } from '@/useTimeout'
import { useTimeout, useTimeoutDefaultOptions } from '@/useTimeout'
import type { AnyFn } from '@/utils/types'

type UseDebounceOptions = UseTimeoutOptions

const useDebounceDefaultOptions = useTimeoutDefaultOptions

/**
 * Safe debounce function that can be executed anywhere
 * @param options - Debounce options
 * @returns The debounce wrapper function
 *
 * @example
 * ```tsx
 * const debounce = useDebounce()
 * const [input, setInput] = useState<string>('')
 *
 * useEffect(() => {
 *   debounce(anySearchFn(input), 1000)
 * }, [input])
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/utility-usedebounce
 * @beta
 */
const useDebounce = (
  options: UseDebounceOptions = useDebounceDefaultOptions
): typeof set => {
  const { set, clear } = useTimeout(options)

  return (invoke: AnyFn, ms: number): typeof clear => {
    clear()
    set(invoke, ms)
    return clear
  }
}

export { useDebounce }
