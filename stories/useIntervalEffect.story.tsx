import {
  Code,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { useMemo } from 'preact/hooks'

import { useIntervalEffect } from '@/useIntervalEffect'
import { useNumber } from '@/useNumber'

import type { Meta } from '@storybook/preact'

import Docs from '@doc/useIntervalEffect.mdx'
export const Demo = (): JSX.Element => {
  const [now, { set }] = useNumber(Date.now())

  const date = useMemo(() => new Date(now).toLocaleTimeString(), [now])
  useIntervalEffect(
    {
      callback: () => set(Date.now()),
      ms: 1000
    },
    []
  )
  return (
    <>
      <Text>{date}</Text>
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
                <Code>UseIntervalEffectOptions</Code>
              </Text>

              <Text>
                callback: <Code>(args: void) ={'>'} void</Code>
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
  title: 'effect/useIntervalEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
