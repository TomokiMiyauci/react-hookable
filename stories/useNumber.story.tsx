import { Button, HStack, Text, Code } from '@chakra-ui/react'

import { useNumber } from '@/useNumber'

import type { ArgTypes } from '@story/shared/types'
import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/useNumber.mdx'

// eslint-disable-next-line react/prop-types
const Template: Story<{ initialState: number }> = ({ initialState }) => {
  const [state, { inc, dec, set }] = useNumber(initialState)

  return (
    <>
      <HStack mb="3" space="x-2">
        <Button onClick={() => inc()}>Increment</Button>
        <Button onClick={() => dec()}>Decrement</Button>
        <Button onClick={() => inc(5)}>Increment(5)</Button>
        <Button onClick={() => dec(5)}>Decrement(5)</Button>
        <Button onClick={() => set(100)}>Set(100)</Button>
      </HStack>

      <Text>
        state: <Code>{state}</Code>
      </Text>
    </>
  )
}

export const Deno = Template.bind({})

const argTypes: ArgTypes = {
  initialState: {
    description: 'The initial value',
    control: {
      type: 'number'
    },
    table: {
      category: 'args',
      defaultValue: {
        summary: 0
      },
      type: {
        summary: 'number'
      }
    }
  },
  state: {
    description: 'Stateful state',
    table: {
      category: 'returns',
      subcategory: '[0]',
      type: {
        summary: 'number'
      }
    }
  },
  stateUpdater: {
    description: 'Functions to update state',
    table: {
      category: 'returns',
      subcategory: '[1]',
      type: {
        summary: 'StateUpdater',
        detail:
          'type StateUpdater = { inc: (delta?: number) => void dec: (delta?: number) => void set: (value: number) => void }'
      }
    }
  }
}

export default {
  title: 'state/useNumber',
  component: Template,
  argTypes,
  args: {
    initialState: 0
  },
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Template>
