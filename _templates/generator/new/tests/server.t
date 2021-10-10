---
to: tests/server/<%= name %>_test.ts
---
import { renderHook } from '@testing-library/react-hooks/server'

import { <%= name %> } from '@/<%= name %>'

describe('<%= name %>', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => <%= name %>())

    expect(result.error).toBeUndefined()
  })
})

