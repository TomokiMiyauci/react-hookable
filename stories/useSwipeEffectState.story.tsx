/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Code, HStack, Text } from '@chakra-ui/react'
import classnames from 'clsx'
import { useMemo, useRef } from 'preact/hooks'

import { useBoolean } from '@/useBoolean'
import { useSwipeEffectState } from '@/useSwipeEffectState'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import Docs from '@doc/useSwipeEffectState.mdx'
export const Demo: FunctionalComponent = () => {
  const ref = useRef<SVGCircleElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const [use, { on, off }] = useBoolean()
  const [
    { isSwiping, direction, lengthX, lengthY, coordsStart, coordsEnd },
    { reset }
  ] = useSwipeEffectState(
    {
      target: ref,
      onSwipeEnd: () => {
        reset()
      }
    },
    [use],
    () => use
  )

  const width = useMemo(() => {
    if (!svg.current) return
    const { width } = svg.current.getClientRects()[0]
    return width
  }, [svg.current])

  const height = useMemo(() => {
    if (!svg.current) return
    const { height } = svg.current.getClientRects()[0]
    return height
  }, [svg.current])

  const cx = useMemo(() => {
    if (!svg.current || typeof width === 'undefined') return

    return (100 / width) * lengthX
  }, [lengthX, width])

  const cy = useMemo(() => {
    if (!svg.current || typeof height === 'undefined') return

    return (100 / height) * -lengthY
  }, [lengthY, height])

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        ref={svg}
        viewBox="0 0 100 100"
        className="max-w-lg"
      >
        <rect
          className="fill-current text-gray-50"
          width="100"
          height="100"
        ></rect>
        <line
          className="stroke-current text-gray-300 stroke-1"
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          strokeDasharray="2"
        />
        <line
          className="stroke-current text-gray-300 stroke-1"
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          strokeDasharray="2"
        />

        <circle
          ref={ref}
          cx={50 + (cx ?? 0)}
          cy={50 + (cy ?? 0)}
          r="3"
          className={classnames(
            'fill-current',
            { 'transition-all duration-300': !isSwiping },
            use ? 'text-blue-300 active:text-blue-400' : 'text-gray-300'
          )}
        ></circle>
      </svg>
      <HStack space="x-2" mb="2">
        <Button onClick={on}>use</Button>
        <Button onClick={off}>disuse</Button>

        <span>
          using: <Code>{String(use)}</Code>
        </span>
      </HStack>
      <Text>
        isSwiping: <Code>{String(isSwiping)}</Code>
      </Text>
      <Text>direction: {direction}</Text>
      <Text>lengthX: {lengthX}</Text>
      <Text>lengthY: {lengthY}</Text>
      <Text>coordsStart: {JSON.stringify(coordsStart)}</Text>
      <Text>coordsEnd: {JSON.stringify(coordsEnd)}</Text>
    </>
  )
}

export default {
  title: 'effectstate/useSwipeEffectState',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
