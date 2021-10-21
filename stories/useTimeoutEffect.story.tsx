import {
  Box,
  Code,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useToast
} from '@chakra-ui/react'


import { useIsFirstMountRef } from '@/useIsFirstMountRef'
import { useNumber } from '@/useNumber'
import { useTimeoutEffect } from '@/useTimeoutEffect'

import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import Docs from '@doc/useTimeoutEffect.mdx'
export const Demo: FunctionalComponent = () => {
  const { isFirstMount } = useIsFirstMountRef()
  const [ms, { set: setMs }] = useNumber(1000)
  const toast = useToast({
    title: 'useTimeoutEffect',
    description: `ms: ${ms}ms`,
    position: 'bottom'
  })
  useTimeoutEffect(
    {
      callback: toast,
      ms
    },
    [ms],
    () => !isFirstMount
  )
  return (
    <>
      <Text>
        callback: <Code>toast</Code>
      </Text>

      <Text>
        ms: <Code>{ms}</Code>ms
      </Text>

      <Box p="3.5">
        <Slider onChange={setMs} value={ms} min={0} max={2000} step={500}>
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </Box>

      <Text>
        deps: <Code>ms</Code>
      </Text>

      <Text>
        condition: <Code>!isFirstMount</Code>
      </Text>
    </>
  )
}

export default {
  title: 'effect/useTimeoutEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
