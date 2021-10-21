import {
  Table,
  Code,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { useState } from 'preact/hooks'

import { useAnimationFrameEffect } from '@/useAnimationFrameEffect'

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
                <Code>UseAnimationFrameEffectOptions</Code>
              </Text>

              <Text>
                callback: <Code>FrameRequestCallback</Code>
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
  title: 'effect/useAnimationFrameEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
