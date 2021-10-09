import { useEffect, useRef } from 'react'

const useIsFirstMount = (): boolean => {
  const isFirstMount = useRef<boolean>(true)

  if (isFirstMount.current) {
    isFirstMount.current = false

    return true
  }

  return isFirstMount.current
}

/**
 * Hooks for effect on update dependency
 * @param effect - Imperative function that can return a cleanup function
 * @param deps - Effect will only activate if the values in the list change.
 *
 * @example
 * ```ts
 * const [state, setState] = useState(false)
 *
 * useUpdateEffect(() => {
 *   // Not call when first mount
 *   // When deps update, then effect
 * }, [state])
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/enhancement-useupdateeffect
 * @beta
 */
const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useIsFirstMount()

  useEffect(() => {
    if (isFirstMount) return

    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { useIsFirstMount, useUpdateEffect }
