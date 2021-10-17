---
to: tests/browser/<%= name %>_test.ts
---
import { renderHook } from '@testing-library/react-hooks'

import { <%= name %> } from '@/<%= name %>'

describe('<%= name %>', () => {
  it('should be defined', () => expect(<%= name %>).toBeDefined())

  it('should', () => {
    renderHook(() => <%= name %>())
  })
})
