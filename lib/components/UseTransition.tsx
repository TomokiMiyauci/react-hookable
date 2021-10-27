import { useRef } from 'react'

import { useTransitionEffect } from '@/useTransitionEffect'
import type { TransitionClassName } from '@/useTransitionEffect'

import type { RefObject } from 'react'

type TransitionProps<T extends HTMLElement | SVGElement> = {
  children: ({ ref }: { ref: RefObject<T> }) => unknown
  show: boolean
} & Partial<TransitionClassName>

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

  useTransitionEffect({
    enter,
    enterFrom,
    enterTo,
    leaveTo,
    leaveFrom,
    leave,
    target: ref
  })

  return <>{children({ ref })}</>
}

export default UseTransition
