import { useRef, useEffect, useLayoutEffect, useMemo } from 'react'

import { cleanClassName } from '@/shared'
import { useEventListenerEffect } from '@/useEventListenerEffect'

import type { RefObject } from 'react'

const useClassMemo = (className?: string): string[] =>
  useMemo(() => cleanClassName(className ?? ''), [className])

type TransitionProps<T extends HTMLElement | SVGElement> = {
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
  children: ({ ref, show }: { ref: RefObject<T>; show: boolean }) => unknown
  show: boolean
}

const UseTransition = <T extends HTMLElement | SVGElement>({
  children,
  enter,
  enterFrom,
  enterTo,
  show
}: TransitionProps<T>): JSX.Element => {
  const ref = useRef<T>(null)

  const _enter = useClassMemo(enter)
  const _enterTo = useClassMemo(enterTo)
  const _enterFrom = useClassMemo(enterFrom)

  useEventListenerEffect(
    {
      target: ref,
      type: 'transitionend',
      listener: () => ref.current?.classList.remove(..._enterTo, ..._enter)
    },
    [show]
  )

  useLayoutEffect(() => ref.current?.classList.add(..._enterFrom), [show])
  useEffect(() => {
    ref.current?.classList.remove(..._enterFrom)
    ref.current?.classList.add(..._enterTo, ..._enter)
  }, [show, _enter, _enterFrom, _enterTo])

  return <>{children({ ref, show })}</>
}

export default UseTransition
