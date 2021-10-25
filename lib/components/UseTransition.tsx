import { useRef, useMemo } from 'react'

import { cleanClassName } from '@/shared'
import { useTransitionTimingEffect } from '@/useTransitionTimingEffect'

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
  children: ({ ref }: { ref: RefObject<T> }) => unknown
  show: boolean
}

const UseTransition = <T extends HTMLElement | SVGElement>({
  children,
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo
}: TransitionProps<T>): JSX.Element => {
  const ref = useRef<T>(null)

  const _enter = useClassMemo(enter)
  const _enterTo = useClassMemo(enterTo)
  const _enterFrom = useClassMemo(enterFrom)
  const _leave = useClassMemo(leave)
  const _leaveTo = useClassMemo(leaveTo)
  const _leaveFrom = useClassMemo(leaveFrom)

  useTransitionTimingEffect({
    target: ref,
    show: undefined,
    onBeforeEnter: () => {
      ref.current?.classList.add(..._enterFrom)
    },
    onEnter: () => {
      ref.current?.classList.remove(..._enterFrom)
      ref.current?.classList.add(..._enterTo, ..._enter)
    },
    onAfterEnter: () => {
      ref.current?.classList.remove(..._enterTo, ..._enter)
    },
    onBeforeLeave: () => {
      ref.current?.classList.add(..._leaveFrom)
    },
    onLeave: () => {
      ref.current?.classList.remove(..._leaveFrom)
      ref.current?.classList.add(..._leaveTo, ..._leave)
    },
    onAfterLeave: () => {
      ref.current?.classList.remove(..._leaveTo, ..._leave)
      if (ref.current) {
        ref.current.style.display = 'none'
      }
    }
  })

  return <>{children({ ref })}</>
}

export default UseTransition
