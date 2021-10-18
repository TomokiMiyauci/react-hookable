import { useState } from 'react'

import type { Position } from '@/shared/types'
import { useEventListener } from '@/useEventListener'
import type { MaybeRecord, VFn } from '@/utils/types'

type WindowScrollStateReturn = [
  MaybeRecord<Position>,
  {
    use: (options?: AddEventListenerOptions | boolean) => void
    disuse: VFn
  }
]

/**
 * Reactive window scroll
 * @returns Set of `window` scroll position and applier
 *
 * @example
 * ```tsx
 * const [{ x, y }, { use, disuse }] = useWindowScrollState()
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/stateset-usewindowscrollstate
 * @deprecated 1.0.0-beta.36
 */
const useWindowScrollState = (): WindowScrollStateReturn => {
  const [state, setState] = useState<MaybeRecord<Position>>({
    x: undefined,
    y: undefined
  })
  const { add, remove } = useEventListener()

  const setPosition: VFn = () =>
    setState({
      x: window.scrollX,
      y: window.scrollY
    })

  const use = (options?: AddEventListenerOptions | boolean): void => {
    remove()
    setPosition()
    add(window, 'scroll', setPosition, options)
  }

  const disuse: VFn = () => {
    remove()
    setState({
      x: undefined,
      y: undefined
    })
  }

  return [state, { use, disuse }]
}

export { useWindowScrollState }
