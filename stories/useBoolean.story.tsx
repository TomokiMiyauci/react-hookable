import { Button, HStack, Text, Code } from '@chakra-ui/react'

import { useBoolean } from '@/useBoolean'

import type { ArgTypes } from '@story/shared/types'
import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/useBoolean.mdx'

// eslint-disable-next-line react/prop-types
const Template: Story<{ initialState: boolean }> = ({ initialState }) => {
  const [state, { toggle, on, off }] = useBoolean(initialState)

  return (
    <>
      <HStack mb="3" spacing="1.5">
        <Button onClick={toggle}>Toggle</Button>
        <Button onClick={on}>On</Button>
        <Button onClick={off}>Off</Button>
      </HStack>
      <Text mb="1.5">
        state: <Code>{String(state)}</Code>
      </Text>
    </>
  )
}

export const Demo = Template.bind({})

const argTypes: ArgTypes = {
  initialState: {
    description:
      'The initial value (or a function that returns the initial value)',
    control: {
      type: 'boolean'
    },
    table: {
      category: 'args',
      defaultValue: {
        summary: 'false'
      },
      type: {
        summary: 'boolean | (() => boolean)'
      }
    }
  },
  state: {
    description: 'Stateful state',
    table: {
      category: 'returns',
      subcategory: '[0]',
      type: {
        summary: 'boolean'
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
        detail: 'type StateUpdater = { on: VFn; off: VFn; toggle: VFn }'
      }
    }
  }
}

export default {
  title: 'state/useBoolean',
  component: Template,
  argTypes,
  args: {
    initialState: false
  },
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Template>
