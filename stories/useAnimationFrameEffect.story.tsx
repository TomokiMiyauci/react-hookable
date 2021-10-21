import { Text } from '@chakra-ui/react'
import { useState } from 'preact/hooks'

import { useAnimationFrameEffect } from '@/useAnimationFrameEffect'
import { condition, deps } from '@story/shared/constants'

import type { ExtendedArgType } from '@story/shared/types'
import type { Meta } from '@storybook/preact'

import Docs from '@doc/useAnimationFrameEffect.mdx'

const Timestamp = (): JSX.Element => {
  const [ts, setTs] = useState<number>(Date.now())
  useAnimationFrameEffect(
    {
      callback: () => setTs(Date.now())
    },
    [ts]
  )
  return <Text>{ts}</Text>
}
export const Demo = (): JSX.Element => {
  return (
    <>
      <Timestamp />
    </>
  )
}

const argTypes: Record<string, ExtendedArgType> = {
  callback: {
    description:
      'The function to call when it is time to update your animation for the next repaint',
    type: {
      required: true
    },
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'FrameRequestCallback'
      }
    }
  },
  deps,
  condition
}

export default {
  title: 'effect/useAnimationFrameEffect',
  component: Demo,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
