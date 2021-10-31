import { useRef, cloneElement } from 'react'

import { useClickOutsideEffect } from '@/useClickOutsideEffect'
import type { UseClickOutsideEffectOptions } from '@/useClickOutsideEffect'

import type { IsNever, MaybeFn } from '@/utils/types'
import type { RefObject } from 'react'

type UseClickOutsideChildProps<T extends HTMLElement | SVGElement> = {
  /**
   * Give click outside `ref`
   */
  ref: RefObject<T>
}

type UseClickOutsideProps<
  T extends HTMLElement | SVGElement,
  K extends MaybeFn<JSX.Element>
> = {
  /**
   * Child component
   */
  children: K extends JSX.Element
    ? JSX.Element
    : (props: UseClickOutsideChildProps<T>) => JSX.Element

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
 * @example
 * ```tsx
 * <UseClickOutside onClickOutside={() => {
 *   // call on click outside
 * }}>
 *   <div />}
 * </UseClickOutside>
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/component-useclickoutside
 * @beta
 */
const UseClickOutside = <
  T extends HTMLElement | SVGElement = never,
  K extends MaybeFn<JSX.Element> = IsNever<T> extends true
    ? JSX.Element
    : () => JSX.Element
>({
  children,
  onClickOutside,
  onClickInside,
  events,
  ref
}: UseClickOutsideProps<T, K>): JSX.Element => {
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

  if (typeof children === 'function') {
    return children({ ref: ref ?? _ref })
  } else {
    return cloneElement(children, {
      ref: ref ?? _ref
    })
  }
}

export default UseClickOutside
export type { UseClickOutsideProps, UseClickOutsideChildProps }
