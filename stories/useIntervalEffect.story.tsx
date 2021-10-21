import { Text } from '@chakra-ui/react'
import { useMemo, useRef } from 'preact/hooks'

import { useIntervalEffect } from '@/useIntervalEffect'
import type { UseIntervalEffectOptions } from '@/useIntervalEffect'
import { useNumber } from '@/useNumber'
import { deps, condition } from '@story/shared/constants'

import type { ArgTypes } from '@story/shared/types'
import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/useIntervalEffect.mdx'

// eslint-disable-next-line react/prop-types
const Template: Story<UseIntervalEffectOptions> = ({ ms }) => {
  const [now, { set }] = useNumber(Date.now())
  const ref = useRef<HTMLDivElement>(null)

  const date = useMemo(() => new Date(now).toLocaleTimeString(), [now])
  useIntervalEffect(
    {
      callback: () => {
        set(Date.now())
        ref.current?.animate(
          {
            color: 'yellow'
          },
          200
        )
      },
      ms
    },
    []
  )
  return (
    <>
      <Text>{date}</Text>
      <Text ref={ref}>callback: updateState</Text>
      <Text>ms: {ms} ms</Text>
    </>
  )
}
export const Demo = Template.bind({})

const argTypes: ArgTypes = {
  callback: {
    description: 'A function to be executed every delay milliseconds',
    type: {
      required: true
    },
    control: {
      type: null
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
      'The time, in milliseconds (thousandths of a second), the timer should delay in between executions of the specified function or code.',
    control: {
      type: 'number',
      min: 4,
      max: 2147483647
    },

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
  title: 'effect/useIntervalEffect',
  component: Template,
  args: {
    ms: 1000
  },
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
