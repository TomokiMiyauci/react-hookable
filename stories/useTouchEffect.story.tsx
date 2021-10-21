import { Box, Code, Text, useToast } from '@chakra-ui/react'
import { useRef, useState } from 'preact/hooks'

import { useTouchEffect } from '@/useTouchEffect'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'


import Docs from '@doc/useTouchEffect.mdx'
export const Demo: FunctionalComponent = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ x, y }, setState] = useState({ x: 0, y: 0 })
  const toast = useToast({ title: 'onTouchEnd' })
  useTouchEffect(
    {
      target: ref,
      onTouchStart: (e) => {
        console.info('onTouchStart', e)
      },
      onTouchMove: (e) => {
        setState({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      },
      onTouchEnd: () => {
        toast()
      }
    },
    []
  )
  return (
    <>
      <Box
        ref={ref}
        bg="blue.500"
        width="80"
        height="80"
        borderWidth="1px"
        borderRadius="lg"
        color="white"
        borderStyle="dotted"
        className="grid place-items-center"
        mb="4"
      >
        Touch here
      </Box>

      <Text>
        onTouchStart: <Code>console.info</Code>
      </Text>
      <Text>
        onTouchMove:
        <Text ml="4">clientX: {x}</Text>
        <Text ml="4">clientY: {y}</Text>
      </Text>

      <Text>onTouchEnd: alert</Text>
    </>
  )
}

export default {
  title: 'effect/useTouchEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
