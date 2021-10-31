import { renderHook } from '@testing-library/react-hooks/server'
import { createRef } from 'react'

import { useClickOutsideEffect } from '@/useClickOutsideEffect'

describe('useClickOutsideEffect', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() =>
      useClickOutsideEffect({
        target: createRef(),
        onClickOutside: jest.fn()
      })
    )

    expect(result.error).toBeUndefined()
  })
})
