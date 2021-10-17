import type { MutableRefObject } from 'react'
import { RefObject, useRef } from 'react'

import { VFn } from '@/utils/types'
type RefArrayReturn<T> = {
  _ref: MutableRefObject<T[]>
  clear: VFn
  add: (...items: Parameters<Array<T>['push']>) => void
}
const useRefArray = <T>(initialState: T[] = []): RefArrayReturn<T> => {
  const ref = useRef<T[]>(initialState)

  return {
    _ref: ref,
    clear: () => {
      ref.current.length = 0
    },
    add: (...items: Parameters<Array<T>['push']>): void => {
      ref.current.push(...items)
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const takeCurrent = <T extends Record<PropertyKey, any>>(
  maybeRef: T | RefObject<T>
): T | null => {
  if ('current' in maybeRef) {
    return maybeRef.current
  }
  return maybeRef
}

export { takeCurrent, useRefArray }
