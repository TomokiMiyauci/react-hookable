import {
  Text,
  Code,
  Table,
  Th,
  Td,
  Tr,
  Tbody,
  Thead,
  TableCaption
} from '@chakra-ui/react'
import { useRef, useState } from 'preact/hooks'

import { useWebSocket } from '@/useWebSocket'
import { flash } from '@story/shared/utils'
import { argTypes } from '@story/useWebSocket/docs'

import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/useWebSocket.mdx'

const Template: Story = (): JSX.Element => {
  const [state, setState] = useState<
    [string, string, string, string, string][]
  >([])
  const ref = useRef<HTMLDivElement>(null)
  useWebSocket<string>(
    {
      url: 'wss://ws-api.coincheck.com/',
      data: JSON.stringify({ type: 'subscribe', channel: 'btc_jpy-trades' }),
      onMessage: ({ data }) => {
        setState((state) => {
          const _ = state.splice(0, 6)
          return [JSON.parse(data), ..._]
        })
        flash(ref)
      }
    },
    []
  )
  return (
    <>
      <Text>
        url: <Code>wss://ws-api.coincheck.com/</Code>
      </Text>

      <Text>
        data:{' '}
        <Code>
          {'JSON.stringify({ type: "subscribe", channel: "btc_jpy-trades" })'}
        </Code>
      </Text>
      <Text ref={ref}>onMessage: updateState</Text>

      <Table>
        <TableCaption>BTCJPY Coincheck Trade History</TableCaption>
        <Thead>
          <Tr>
            <Th>price</Th>
            <Th>amount</Th>
            <Th>side</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.map(([id, , price, amount, side]) => {
            return (
              <Tr key={id}>
                <Td>{price}</Td>
                <Td>{amount}</Td>
                <Td>{side}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}

export const Demo = Template.bind({})

export default {
  title: 'effect/useWebSocket',
  component: Template,
  argTypes,

  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Template>
