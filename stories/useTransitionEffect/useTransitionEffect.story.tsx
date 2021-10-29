import { StarIcon } from '@chakra-ui/icons'
import {
  Box,
  Image,
  Button,
  Badge,
  Flex,
  Text,
  Code,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { forwardRef } from 'preact/compat'
import { useRef, useState } from 'preact/hooks'

import { useBoolean } from '@/useBoolean'
import { useIntersectionObserverEffect } from '@/useIntersectionObserverEffect'
import { useTransitionEffect } from '@/useTransitionEffect'
import { title, argTypes } from '@story/useTransitionEffect/docs'

import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/useTransitionEffect.mdx'

const property = {
  imageUrl: 'https://bit.ly/2Z4KKcF',
  imageAlt: 'Rear view of modern home with pool',
  beds: 3,
  baths: 2,
  title: 'Modern home in city center in the heart of historic Los Angeles',
  formattedPrice: '$1,900.00',
  reviewCount: 34,
  rating: 4
}

const Sample = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Box
      ref={ref}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="shadow hover:shadow-xl"
    >
      <Image loading="lazy" src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  )
})

const Template: Story = () => {
  const target = useRef<HTMLDivElement>(null)
  useTransitionEffect({
    target,
    enterFrom:
      'opacity-0 bg-teal-900 transform scale-0 translate-x-full translate-y-full rotate-180',
    enter: 'transition duration-[3000ms]',
    enterTo: 'transform -translate-y-20 -translate-x-20 -rotate-45 scale-150',
    entered: 'transition duration-300'
  })

  return (
    <>
      <Sample ref={target} />
    </>
  )
}

export const Demo = Template.bind({})

export const Control = (): JSX.Element => {
  const target = useRef<HTMLDivElement>(null)
  const [show, { toggle }] = useBoolean()
  useTransitionEffect({
    target,
    show,
    enterFrom: 'opacity-0 bg-teal-900 transform scale-y-0 translate-y-full',
    enter: 'transition duration-500 delay-300',
    enterTo: 'transform -translate-y-10 duration-1000',
    entered: 'transition duration-500',
    leave: 'transition duration-500',
    leaveTo: 'opacity-0 scale-x-0 transform',
    keepLayout: true
  })

  return (
    <>
      <Button mb="3" onClick={toggle}>
        {show ? 'HIDDEN' : 'SHOW'}
      </Button>

      <Sample ref={target} />
    </>
  )
}

export const AdvancedControl = (): JSX.Element => {
  const target = useRef<HTMLDivElement>(null)
  const target2 = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  useIntersectionObserverEffect(
    {
      target: ref,
      callback: (enter) => {
        enter.forEach(({ isIntersecting }) => {
          setState(isIntersecting)
        })
      }
    },
    []
  )

  const [state, setState] = useState(false)
  useTransitionEffect(
    {
      target,
      show: state,
      enterFrom: 'opacity-0 bg-teal-900 transform scale-0 rotate-180',
      enter: 'transition duration-1000 delay-300',
      entered: 'transition-all duration-300',
      leave: 'transition duration-500',
      leaveTo: 'opacity-0 scale-x-0 transform',
      keepLayout: true
    },
    []
  )

  useTransitionEffect(
    {
      target: target2,
      show: state,
      enterFrom: 'opacity-0 bg-teal-900 transform scale-0',
      enter: 'transition duration-1000 delay-700',
      entered: 'transition-shadow duration-300',
      leave: 'transition duration-500',
      leaveTo: 'opacity-0 scale-x-0 transform',
      keepLayout: true
    },
    []
  )

  return (
    <>
      <Text textAlign="center">scroll down</Text>

      <Box my="96" overflow="scroll" h="6xl">
        <Box mt="72" p="8" borderStyle="dashed" borderWidth="4px" ref={ref}>
          <Flex experimental_spaceX="4">
            <Sample ref={target} />
            <Sample ref={target2} />
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export const ReturnState = (): JSX.Element => {
  const target = useRef<HTMLDivElement>(null)

  const [state, { toggle }] = useBoolean(false)
  const { isShow } = useTransitionEffect(
    {
      target,
      show: state,
      enterFrom: 'opacity-0 bg-teal-900 transform scale-0 rotate-180',
      enter: 'transition duration-1000 delay-300',
      entered: 'transition-all duration-300',
      leave: 'transition duration-500',
      leaveTo: 'opacity-0 scale-x-0 transform',
      keepLayout: true
    },
    []
  )

  return (
    <>
      <Alert>
        <AlertIcon />
        <Text>
          Provides a state with adjusted rendering timing. This can be used to
          control the rendering of the DOM.
        </Text>
      </Alert>
      <Button my="3" onClick={toggle}>
        TOGGLE
      </Button>
      <Text mb="3">
        isShow: <Code>{String(isShow)}</Code>
      </Text>
      {isShow && <Sample ref={target} />}
    </>
  )
}

export default {
  title,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta
