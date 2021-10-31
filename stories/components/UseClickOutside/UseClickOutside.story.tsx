import {
  Button,
  Heading,
  Box,
  Flex,
  CloseButton,
  Divider,
  Tooltip
} from '@chakra-ui/react'
import { forwardRef } from 'preact/compat'
import { useRef, useCallback } from 'preact/hooks'

import UseClickOutside from '@/components/UseClickOutside'
import { useBoolean } from '@/useBoolean'
import { useTransitionEffect } from '@/useTransitionEffect'
import { argTypes } from '@story/components/UseClickOutside/docs'

import type { VFn } from '@/utils/types'
import type { Meta } from '@storybook/preact'

import Docs from '@doc/components/UseClickOutside.mdx'

export const Demo = (): JSX.Element => {
  const [state, { on, off }] = useBoolean()
  const target = useRef<HTMLDivElement>(null)

  const { isShow } = useTransitionEffect(
    {
      target,
      show: state,
      enterFrom: 'opacity-0',
      enter: 'transition-opacity duration-300',
      leave: 'transition-opacity duration-300',
      leaveTo: 'opacity-0'
    },
    []
  )

  return (
    <>
      <Button onClick={on}>SHOW</Button>
      {isShow && (
        <Box
          position="fixed"
          ref={target}
          p="28"
          inset="0"
          cursor="pointer"
          className="backdrop-blur-md"
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
          <UseClickOutside<HTMLDivElement> onClickOutside={off}>
            {({ ref }) => <Dialog ref={ref} onClose={off} />}
          </UseClickOutside>
        </Box>
      )}
    </>
  )
}

const Dialog = forwardRef<HTMLDivElement, { onClose: VFn }>(
  ({ onClose }, ref) => {
    return (
      <Flex
        bg="gray.50"
        rounded="xl"
        borderWidth="1px"
        borderColor="gray.200"
        shadow="md"
        _hover={{
          shadow: 'xl'
        }}
        cursor="auto"
        minH="72"
        transition="all"
        transitionDuration="300ms"
        flexDir="column"
        ref={ref}
      >
        <Flex as="header" experimental_spaceX="2" p="1" alignItems="center">
          <Tooltip label="Close">
            <CloseButton onClick={onClose} />
          </Tooltip>

          <Heading fontSize="xl" verticalAlign="center" display="inline">
            UseClickOutside
          </Heading>
        </Flex>
        <Divider />

        <Box
          fontSize="4xl"
          color="gray.300"
          className="flex-1"
          display="grid"
          placeItems="center"
        >
          inside
        </Box>
      </Flex>
    )
  }
)

export const Ref = (): JSX.Element => {
  const [state, { on, off }] = useBoolean()
  const target = useRef<HTMLDivElement>(null)

  const { isShow } = useTransitionEffect(
    {
      target,
      show: state,
      enterFrom: 'opacity-0',
      enter: 'transition-opacity duration-300',
      leave: 'transition-opacity duration-300',
      leaveTo: 'opacity-0'
    },
    []
  )

  const onClose = useCallback(off, [off])

  return (
    <>
      <Button onClick={on}>SHOW</Button>
      {isShow && (
        <Box
          position="fixed"
          ref={target}
          p="28"
          inset="0"
          cursor="pointer"
          className="backdrop-blur-md"
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
          <UseClickOutside onClickOutside={off}>
            <Dialog onClose={onClose} />
          </UseClickOutside>
        </Box>
      )}
    </>
  )
}

export default {
  title: 'component/UseClickOutside',
  component: Demo,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
