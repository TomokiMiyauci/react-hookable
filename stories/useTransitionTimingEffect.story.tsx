import { Button, useToast } from '@chakra-ui/react'
import { useRef } from 'preact/hooks'

import { useBoolean } from '@/useBoolean'
import { useTransitionTimingEffect } from '@/useTransitionTimingEffect'

import type { ArgTypes } from '@story/shared/types'
import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/useTransitionTimingEffect.mdx'

const Template: Story = (): JSX.Element => {
  const [entered, { toggle }] = useBoolean(false)
  const toast = useToast({
    title: 'useTransitionTimingEffect',
    position: 'bottom-right'
  })
  const target = useRef<HTMLDivElement>(null)
  useTransitionTimingEffect(
    {
      target,
      entered,
      onBeforeEnter: () =>
        toast({
          description: 'onBeforeEnter'
        }),

      onEnter: () => {
        toast({
          description: 'onEnter',
          status: 'success'
        })
      },

      onAfterEnter: () =>
        toast({
          description: 'onAfterEnter',
          status: 'warning'
        }),

      onBeforeLeave: () =>
        toast({
          description: 'onBeforeLeave'
        }),

      onLeave: () => {
        toast({
          description: 'onLeave',
          status: 'success'
        })
      },

      onAfterLeave: () =>
        toast({
          description: 'onAfterLeave',
          status: 'warning'
        })
    },
    []
  )
  return (
    <>
      <Button ref={target} onClick={toggle} />
    </>
  )
}

export const Demo = Template.bind({})

const argTypes: ArgTypes = {}

export default {
  title: 'effect/useTransitionTimingEffect',
  component: Template,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Template>
