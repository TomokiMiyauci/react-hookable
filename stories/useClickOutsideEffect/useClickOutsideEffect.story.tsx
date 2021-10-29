import { Box, Button, Text, useToast } from '@chakra-ui/react'
import { useRef } from 'preact/hooks'

import Portal from '@/components/Portal'
import { useBoolean } from '@/useBoolean'
import { useClickOutsideEffect } from '@/useClickOutsideEffect'
import { useTransitionEffect } from '@/useTransitionEffect'
import { flash } from '@story/shared/utils'
import { argTypes } from '@story/useClickOutsideEffect/docs'

import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/useClickOutsideEffect.mdx'

type DialogProps = {
  show: boolean
  children: JSX.Element
  onClose?: () => void
}

const DialogComponent = ({
  show,
  children,
  onClose
}: DialogProps): JSX.Element => {
  const target = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDivElement>(null)

  const { isShow } = useTransitionEffect(
    {
      target,
      show,
      enterFrom: 'md:opacity-0',
      enter: 'transition duration-1000',
      leaveTo: 'opacity-0',
      leave: 'transition duration-500'
    },
    []
  )

  useTransitionEffect(
    {
      target: dialog,
      show,
      enterFrom: 'transform translate-y-full',
      enter: 'transition duration-500',
      leaveTo: 'transform translate-y-full',
      leave: 'transition duration-500'
    },
    []
  )

  useClickOutsideEffect(
    {
      target: dialog,
      onClickOutside: () => {
        onClose?.()
      }
    },
    [],
    () => show
  )

  return (
    <>
      {isShow && (
        <Portal>
          <Box
            inset="0"
            cursor="pointer"
            position="fixed"
            p="20"
            mx="auto"
            className="md:p-40 backdrop-blur-md bg-opacity-10 backdrop-filter bg-gray-50"
            ref={target}
          >
            <Box
              position="absolute"
              top="10%"
              left="50%"
              fontSize="4xl"
              color="gray.300"
              className="transform -translate-x-1/2 -translate-y-1/2"
            >
              outside
            </Box>
            <Box
              fontSize="4xl"
              color="gray.300"
              className="border duration-300 cursor-auto h-full md:max-h-lg mx-auto max-w-2xl bg-gray-50 rounded-md shadow hover:shadow-md grid place-content-center"
              ref={dialog}
            >
              {children}
            </Box>
          </Box>
        </Portal>
      )}
    </>
  )
}

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
export const Dialog = (): JSX.Element => {
  const [state, { on, off }] = useBoolean()

  return (
    <>
      <DialogComponent onClose={off} show={state}>
        <>inside</>
      </DialogComponent>
      <Button onClick={on}>SHOW</Button>
    </>
  )
}

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
