import { EventLoopDefaultOptions } from '@/shared/constants'
import type { EventLoopOptions } from '@/shared/types'
import { useTimeout } from '@/useTimeout'

/**
 * Safe debounce function that can be executed anywhere
 * @param options - Debounce options
 * @returns The debounce wrapper function
 *
 * @example
 * ```tsx
 * const { use, disuse } = useDebounce()
 * const [input, setInput] = useState<string>('')
 *
 * useEffect(() => {
 *   use(anySearchFn(input), 1000)
 * }, [input])
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/procedure-usedebounce
 * @beta
 */
const useDebounce = (
  options: EventLoopOptions = EventLoopDefaultOptions
): ReturnType<typeof useTimeout> => {
  const { use: _use, disuse, _ref } = useTimeout(options)

  const use: typeof _use = (invoke, ms) => {
    disuse()
    _use(invoke, ms)
  }

  return {
    use,
    disuse,
    _ref
  }
}

export { useDebounce }
