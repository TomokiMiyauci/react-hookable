import { renderHook } from '@testing-library/react-hooks/server'
import { createRef } from 'react'

import { useTransitionEffect } from '@/useTransitionEffect'

describe('useTransitionEffect', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() =>
      useTransitionEffect({
        target: createRef()
      })
    )

    expect(result.error).toBeUndefined()
  })
})
