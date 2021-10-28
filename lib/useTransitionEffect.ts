import { useMemo, useRef, useEffect, useLayoutEffect } from 'react'

import {
  cleanSplittedClassName,
  takeTarget,
  useUniversalEffect,
  onTakeTarget
} from '@/shared'
import { useConditionalEffect } from '@/useConditionalEffect'
import { useIsFirstMountRef } from '@/useIsFirstMountRef'
import { useTransitionTimingEffect } from '@/useTransitionTimingEffect'
import { isBrowser, without } from '@/utils'

import type { Target, UseEffect } from '@/shared/types'
import type { VFn } from '@/utils/types'
import type { MutableRefObject } from 'react'

const useCleanClassList = (className?: string): string[] =>
  useMemo<string[]>(() => cleanSplittedClassName(className ?? ''), [className])

const useClassListRef = (
  target: Target<HTMLElement | SVGElement>
): MutableRefObject<string[]> => {
  const classNameRef = useRef<string[]>([])

  useUniversalEffect(() => {
    classNameRef.current = cleanSplittedClassName(
      takeTarget(target)?.classList.value ?? ''
    )
  }, [target])

  return classNameRef
}

type Enter = 'enter'
type Leave = 'leave'
type From = 'From'
type To = 'To'

type Transition =
  | Enter
  | `${Enter}${From}`
  | `${Enter}${To}`
  | `${Enter}ed`
  | Leave
  | `${Leave}${From}`
  | `${Leave}${To}`

type TransitionClassName = Record<Transition, string>

type UseTransitionEffectOptions = {
  target: Target<HTMLElement | SVGElement>
  show?: boolean

  /**
   * Whether to apply `display: none;` or `visibility: hidden;` to invisible
   * If `false`, `display:none;` will be applied
   * @defaultValue `false`
   */
  keepLayout?: boolean
} & Partial<TransitionClassName>

/**
 * Effect for transition
 * @param options - transition options
 * @param deps - If present, effect will only activate if the values in the list change
 * @param condition - The conditional function that effect or not. If return `true` effect, otherwise not.
 * @example
 * ```tsx
 * useTransitionEffect(
 *   {
 *     target: ref,
 *     enterFrom,
 *     enter,
 *     enterTo,
 *     leaveFrom,
 *     leave,
 *     leaveTo
 *   },
 *   deps,
 *   condition
 * )
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/effect-usetransitioneffect
 * @beta
 */
const useTransitionEffect: UseEffect<UseTransitionEffectOptions> = ({
  enter,
  enterFrom,
  enterTo,
  entered,
  leave,
  leaveFrom,
  leaveTo,
  target,
  show,
  keepLayout = false
}) => {
  const _enter = useCleanClassList(enter)
  const _enterTo = useCleanClassList(enterTo)
  const _enterFrom = useCleanClassList(enterFrom)
  const _entered = useCleanClassList(entered)
  const _leave = useCleanClassList(leave)
  const _leaveTo = useCleanClassList(leaveTo)
  const _leaveFrom = useCleanClassList(leaveFrom)
  const classNameRef = useClassListRef(target)
  const { isFirstMount } = useIsFirstMountRef()

  const cleanUp: VFn = () =>
    [
      _enter,
      _enterTo,
      _enterFrom,
      _entered,
      _leave,
      _leaveFrom,
      _leaveTo
    ].forEach(removeClassList)

  const hide: VFn = () =>
    onTakeTarget(target, (el) => {
      if (keepLayout) {
        el.style.visibility = 'hidden'
      } else {
        el.style.display = 'none'
      }
    })

  useConditionalEffect(
    hide,
    [],
    () => isFirstMount && show === false,
    isBrowser ? useLayoutEffect : useEffect
  )

  const addClassList = (classList: string[]): void => {
    const originalClass = without(classList, classNameRef.current)

    takeTarget(target)?.classList.add(...originalClass)
  }

  const removeClassList = (className: string[]): void => {
    const originalClass = without(className, classNameRef.current)

    takeTarget(target)?.classList.remove(...originalClass)
  }

  useTransitionTimingEffect(
    {
      target,
      entered: show,
      onBeforeEnter: () => {
        cleanUp()
        addClassList(_enterFrom)

        onTakeTarget(target, (el) => {
          if (keepLayout) {
            if (el.style.visibility === 'hidden') {
              el.style.visibility = 'visible'
            }
          } else {
            if (el.style.display === 'none') {
              el.style.display = ''
            }
          }
        })
      },

      onEnter: () => {
        removeClassList(_enterFrom)
        addClassList(_enterTo)
        addClassList(_enter)
      },
      onAfterEnter: () => {
        removeClassList(_enterTo)
        removeClassList(_enter)
        addClassList(_entered)
      },

      onBeforeLeave: () => {
        cleanUp()
        addClassList(_leaveFrom)
      },

      onLeave: () => {
        removeClassList(_leaveFrom)
        addClassList(_leaveTo)
        addClassList(_leave)
      },

      onAfterLeave: () => {
        removeClassList(_leaveTo)
        removeClassList(_leave)

        hide()
      }
    },
    []
  )
}

export { useTransitionEffect }
export type { UseTransitionEffectOptions, TransitionClassName, Transition }
