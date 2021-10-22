import { Box, Code, Text, useToast } from '@chakra-ui/react'
import { useRef } from 'preact/hooks'

import { useIntersectionObserverEffect } from '@/useIntersectionObserverEffect'
import { deps, condition } from '@story/shared/constants'

import type { ArgTypes } from '@story/shared/types'
import type { Meta } from '@storybook/preact'

import Docs from '@doc/useIntersectionObserverEffect.mdx'
export const Demo = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const toast = useToast({
    title: 'useIntersectionObserverEffect',
    position: 'bottom-right'
  })
  useIntersectionObserverEffect(
    {
      target: ref,
      callback: (entry) => {
        entry.forEach(({ isIntersecting }) => {
          toast({
            description: (
              <>
                <Text>
                  <Code>IntersectionObserverEntry</Code>
                </Text>
                <Text>
                  isIntersecting: <Code>{String(isIntersecting)}</Code>
                </Text>
              </>
            )
          })
        })
      }
    },
    []
  )
  return (
    <>
      <Box
        h="72"
        p="8"
        border="2px"
        borderStyle="dashed"
        borderColor="gray.500"
        overflow="scroll"
      >
        <Text align="center">Scroll down</Text>
        <Box
          p="4"
          border="2px"
          borderStyle="dashed"
          borderColor="blue.500"
          my="800px"
          ref={ref}
        >
          Hello world
        </Box>
      </Box>
    </>
  )
}

const argTypes: ArgTypes = {
  target: {
    type: {
      required: true
    },
    description: 'Observe target',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'Element | () => Element | RefObject<Element>'
      }
    }
  },
  callback: {
    type: {
      required: true
    },
    description: 'Call on intersect',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'IntersectionObserverCallback'
      }
    }
  },
  options: {
    description: '`IntersectionObserver` options',
    table: {
      category: 'args',
      subcategory: '[0]{ options }',
      type: {
        summary: 'IntersectionObserverInit | undefined'
      }
    }
  },
  deps,
  condition
}

export default {
  title: 'effect/useIntersectionObserverEffect',
  component: Demo,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
