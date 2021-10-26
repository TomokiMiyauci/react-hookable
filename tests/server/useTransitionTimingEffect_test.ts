import { renderHook } from '@testing-library/react-hooks/server'
import { createRef } from 'react'

import { useTransitionTimingEffect } from '@/useTransitionTimingEffect'

describe('useTransitionTimingEffect', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() =>
      useTransitionTimingEffect({
        target: createRef()
      })
    )

    expect(result.error).toBeUndefined()
  })
})
