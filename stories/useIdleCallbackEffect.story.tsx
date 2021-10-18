import {
  Alert,
  AlertIcon,
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
import Docs from '@doc/useIdleCallbackEffect.mdx'
import type { Meta } from '@storybook/preact'
import { useState } from 'preact/hooks'

import { useBoolean } from '@/useBoolean'
import { useIdleCallbackEffect } from '@/useIdleCallbackEffect'

const Timestamp = (): JSX.Element => {
  const [ts, setTs] = useState<number>(Date.now())
  useIdleCallbackEffect(
    {
      callback: () => setTs(Date.now()),
      fallback: () => {
        const id = requestAnimationFrame(() => setTs(Date.now()))
        return () => cancelAnimationFrame(id)
      }
    },
    [ts]
  )
  return <Text>{ts}</Text>
}
export const Demo = (): JSX.Element => {
  const [isSupported, { on, off }] = useBoolean(true)
  useIdleCallbackEffect(
    {
      callback: on,
      fallback: off
    },
    []
  )
  return (
    <>
      {!isSupported && (
        <Alert status="error">
          <AlertIcon />
          <Text>
            <Text>
              This browser is not support{' '}
              <Code ml="2">requestIdleCallback</Code>.
            </Text>
            <Text>
              Use <Code>requestAnimationFrame</Code> instead.
            </Text>
          </Text>
        </Alert>
      )}
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
                <Code>UseIdleCallbackEffectOptions</Code>
              </Text>

              <Text>
                <Text>
                  callback: <Code>IdleRequestCallback</Code>
                </Text>
                <Text>
                  fallback?: <Code>EffectCallback</Code>
                </Text>

                <Text>
                  options?: <Code>IdleRequestOptions</Code>
                </Text>
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
  title: 'effect/useIdleCallbackEffect',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
