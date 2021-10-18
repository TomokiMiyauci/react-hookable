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
  Tr
} from '@chakra-ui/react'
import Docs from '@doc/useWindowScrollEffectState.mdx'
import type { Meta } from '@storybook/preact'

import { useWindowScrollEffectState } from '@/useWindowScrollEffectState'

export const Demo = (): JSX.Element => {
  const [{ scrollY, scrollX }] = useWindowScrollEffectState({}, [])
  return (
    <>
      <div className="h-[200vh] w-[200vw]">
        <Table maxW="3xl">
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
                  <Code>UseWindowScrollEffectStateOptions</Code>
                </Text>

                <Text>
                  options?: <Code>AddEventListenerOptions</Code> |{' '}
                  <Code>boolean</Code>
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

        <Table maxW="3xl">
          <TableCaption>Return</TableCaption>

          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>[0]</Td>
              <Td>
                <Text mb="2">
                  <Code>WindowState</Code>
                </Text>

                <Text>
                  <Text>
                    scrollX: <Code>number</Code> {scrollX.toFixed(0)}
                  </Text>

                  <Text>
                    scrollY: <Code>number</Code> {scrollY.toFixed(0)}
                  </Text>
                </Text>
              </Td>
            </Tr>

            <Tr>
              <Td>[1]</Td>
              <Td>
                <Code>WindowStateUpdater</Code>
                <Text>{'{}'}</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </div>

      <Box p="2" position="fixed" bottom="0.5" right="0.5">
        <Text>scroll value</Text>
        <Text>scrollX: {scrollX.toFixed(0)}</Text>
        <Text>scrollY: {scrollY.toFixed(0)}</Text>
      </Box>
    </>
  )
}

export default {
  title: 'effectstate/useWindowScrollEffectState',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
