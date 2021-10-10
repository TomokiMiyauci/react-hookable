---
to: stories/<%= name %>.story.tsx
---
import Docs from '@doc/<%= name %>.mdx'
import type { Meta } from '@storybook/preact'
import type { FunctionalComponent } from 'preact'

import { <%= name %> } from '@/<%= name %>'
export const Demo: FunctionalComponent = () => {
  <%= name %>()
  return <></>
}

export default {
  title: '<%= name %>',
  component: Demo,
  parameters: {
    docs: {
      page: Docs
    }
  }
} as Meta<typeof Demo>
