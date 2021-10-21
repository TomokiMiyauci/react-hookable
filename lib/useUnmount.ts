import { useEffect, useRef } from 'react'

import type { VFn } from '@/utils/types'
import type { MutableRefObject } from 'react'
type UnmountReturn = {
  use: (fn: VFn) => void
  disuse: () => void
  _ref: MutableRefObject<VFn[]>
}

/**
 * Register unmount callback
 * @returns Pair of `use` and `disuse` functions
 *
 * @example
 * ```tsx
 * const { use, disuse } = useUnmount()
 * use(voidFn)
 * // unmount
 * voidFn()
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/lifecycle-useunmount
 * @beta
 *
 */
const useUnmount = (): UnmountReturn => {
  const refs = useRef<VFn[]>([])
  useEffect(
    () => () => {
      refs.current.forEach((ref) => ref())
      refs.current = []
    },
    []
  )

  const use = (fn: VFn): void => {
    refs.current.push(fn)
  }

  const disuse: VFn = () => {
    refs.current = []
  }

  return {
    use,
    disuse,
    _ref: refs
  }
}

export { useUnmount }
