import {
  Box,
  Code,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react'
import Docs from '@doc/useIntersectionObserverEffect.mdx'
import type { Meta } from '@storybook/preact'
import { useRef } from 'preact/hooks'

import { useIntersectionObserverEffect } from '@/useIntersectionObserverEffect'
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

      <Table>
        <TableCaption>Args</TableCaption>

        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>options</Td>
            <Td>
              <Text mb="2">
                <Code>UseIntersectionObserverEffectOptions</Code>
              </Text>

              <Text>
                target: <Code>Element</Code> | <Code>() ={'>'} Element </Code> |{' '}
                <Code mr="2">
                  RefObject{'<'}Element{'>'}
                </Code>
                ref(div)
              </Text>
              <Text>
                callback: <Code mr="2">IntersectionObserverCallback</Code> toast
              </Text>

              <Text>
                options?: <Code>IntersectionObserverInit</Code> |{' '}
                <Code>undefined</Code>
              </Text>
            </Td>
          </Tr>

          <Tr>
            <Td>deps</Td>
            <Td>
              <Code>DependencyList</Code>
            </Td>
          </Tr>

          <Tr>
            <Td>condition</Td>
            <Td>
              <Code>
                () ={'>'} Maybe{'<'}boolean{'>'}{' '}
              </Code>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}

export default {
  title: 'effect/useIntersectionObserverEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
