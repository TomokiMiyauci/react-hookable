---
to: stories/<%= name %>.story.tsx
---
import { Button } from '@chakra-ui/react'
import Docs from '@doc/<%= name %>.mdx'
import type { Meta } from '@storybook/preact'
import { useState } from 'preact/hooks'

import { <%= name %> } from '@/<%= name %>'
export const Demo = (): JSX.Element => {
  const [, setState] = useState(false)
  <%= name %>()
  return (
    <>
      <Button onClick={() => setState(true)} />
    </>
  )
}

export default {
  title: '<%= category %>/<%= name %>',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
