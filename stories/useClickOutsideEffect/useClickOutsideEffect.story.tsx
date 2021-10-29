import { Box, Text, useToast } from '@chakra-ui/react'
import { useRef } from 'preact/hooks'

import { useClickOutsideEffect } from '@/useClickOutsideEffect'
import { flash } from '@story/shared/utils'
import { argTypes } from '@story/useClickOutsideEffect/docs'

import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/useClickOutsideEffect.mdx'

const Template: Story = (): JSX.Element => {
  const toast = useToast({
    title: 'useClickOutsideEffect',
    position: 'bottom-right'
  })
  const target = useRef<HTMLDivElement>(null)
  const onClickOutsideRef = useRef<HTMLDivElement>(null)
  const onClickInsideRef = useRef<HTMLDivElement>(null)
  useClickOutsideEffect({
    target,
    onClickOutside: () => {
      toast({
        description: 'onClickOutside'
      })
      flash(onClickOutsideRef)
    },
    onClickInside: () => {
      toast({
        description: 'onClickInside',
        status: 'success'
      })
      flash(onClickInsideRef)
    }
  })

  return (
    <>
      <Box p="4">
        outside
        <Box
          position="relative"
          borderWidth="4px"
          borderStyle="dashed"
          py="6"
          px="4"
          borderColor="blue.500"
          ref={target}
        >
          <Box position="absolute" top="0" left="0" bg="gray.200" px="2">
            ref
          </Box>
          <Box textAlign="center" position="relative">
            inside
          </Box>
        </Box>
      </Box>

      <Box mt="3">
        <Text ref={onClickOutsideRef}>onClickOutside: toast</Text>
        <Text ref={onClickInsideRef}>onClickInsideRef: toast</Text>
      </Box>
    </>
  )
}

export const Demo = Template.bind({})

export default {
  title: 'effect/useClickOutsideEffect',
  component: Template,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Template>
