import type { RefObject } from 'react'
import { useRef } from 'react'

import type { UseRef } from '@/shared/types'

type UseIsFirstMountRefReturn = {
  isFirstMount: boolean
  _ref: RefObject<boolean>
}

/**
 * Ref of first mount or not
 * @returns Object includes `isFirstMount` what is first mount or not
 *
 * @example
 * ```tsx
 * const { isFirstMount } = useIsFirstMountRef()
 * // isFirstMount: true
 * // re-render
 * // isFirstMount: false
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/ref-useidfirstmountref
 * @beta
 */
const useIsFirstMountRef: UseRef<UseIsFirstMountRefReturn> = () => {
  const isFirstMount = useRef<boolean>(true)

  if (isFirstMount.current) {
    isFirstMount.current = false

    return {
      isFirstMount: true,
      _ref: isFirstMount
    }
  }

  return {
    isFirstMount: isFirstMount.current,
    _ref: isFirstMount
  }
}

export { useIsFirstMountRef }
export type { UseIsFirstMountRefReturn }
