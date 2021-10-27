---
to: stories/<%= name %>.story.tsx
---
import { Button } from '@chakra-ui/react'
import { useState } from 'preact/hooks'

import { <%= name %> } from '@/<%= name %>'

import type { ArgTypes } from '@story/shared/types'
import type { Meta, Story } from '@storybook/preact'

import Docs from '@doc/<%= name %>.mdx'

const Template: Story = (): JSX.Element => {
  const [, setState] = useState(false)
  <%= name %>()
  return (
    <>
      <Button onClick={() => setState(true)} />
    </>
  )
}

export const Demo = Template.bind({})

const argTypes: ArgTypes = {}

export default {
  title: '<%= category %>/<%= name %>',
  component: Template,
  argTypes,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Template>
