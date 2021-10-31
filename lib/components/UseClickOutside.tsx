import { useRef } from 'react'

import { useClickOutsideEffect } from '@/useClickOutsideEffect'
import type { UseClickOutsideEffectOptions } from '@/useClickOutsideEffect'

import type { RefObject } from 'react'

type UseClickOutsideChildProps<T extends HTMLElement | SVGElement> = {
  /**
   * Give click outside `ref`
   */
  ref: RefObject<T>
}

type UseClickOutsideProps<T extends HTMLElement | SVGElement> = {
  /**
   * Child component
   */
  children: (props: UseClickOutsideChildProps<T>) => JSX.Element

  /**
   * Merge `ref`
   */
  ref?: RefObject<T>
} & Omit<UseClickOutsideEffectOptions, 'target'>

/**
 * Click outside for component
 * @param props - UseClickOutside props
 * @returns A function that have ref as argument
 *
 * @see https://react-hookable.vercel.app/?path=/story/component-useclickoutside
 * @beta
 */
const UseClickOutside = <T extends HTMLElement | SVGElement>({
  children,
  onClickOutside,
  onClickInside,
  events,
  ref
}: UseClickOutsideProps<T>): JSX.Element => {
  const _ref = useRef<T>(null)

  useClickOutsideEffect(
    {
      target: ref ?? _ref,
      onClickOutside,
      onClickInside,
      events
    },
    []
  )

  return children({ ref: ref ?? _ref })
}

export default UseClickOutside
export type { UseClickOutsideProps, UseClickOutsideChildProps }
