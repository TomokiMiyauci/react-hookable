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
import type { UseTimeoutEffectOptions } from '@/useTimeoutEffect'
import { deps, condition } from '@story/shared/constants'
import { useRef } from 'preact/hooks'

import type { ArgTypes } from '@story/shared/types'
import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/useTimeoutEffect.mdx'

const Template: Story<UseTimeoutEffectOptions> = () => {
  const { isFirstMount } = useIsFirstMountRef()
  const [ms, { set: setMs }] = useNumber(1000)
  const ref = useRef<HTMLDivElement>(null)
  const toast = useToast({
    title: 'useTimeoutEffect',
    description: 'callback',
    position: 'bottom-right'
  })
  useTimeoutEffect(
    {
      callback: () => {
        toast()
        ref.current?.animate(
          {
            color: 'yellow'
          },
          200
        )
      },
      ms
    },
    [ms],
    () => !isFirstMount
  )
  return (
    <>
      <Text ref={ref}>callback: toast</Text>

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
    </>
  )
}

export const Demo = Template.bind({})

const argTypes: ArgTypes = {
  callback: {
    description: 'A function to be executed after delay milliseconds',
    type: {
      required: true
    },
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: '() => void'
      }
    }
  },
  ms: {
    description:
      'The time, in milliseconds (thousandths of a second), the timer should delay',

    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'number | undefined'
      }
    }
  },

  deps,
  condition
}

export default {
  title: 'effect/useTimeoutEffect',
  component: Template,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
