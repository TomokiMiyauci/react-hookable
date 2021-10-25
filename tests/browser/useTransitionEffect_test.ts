import { renderHook } from '@testing-library/react-hooks'
import { createRef } from 'react'

import { useTransitionEffect } from '@/useTransitionEffect'

describe('useTransitionEffect', () => {
  it('should be defined', () => expect(useTransitionEffect).toBeDefined())

  it('should not throw error', () => {
    const { result } = renderHook(() =>
      useTransitionEffect({
        target: createRef()
      })
    )

    expect(result.error).toBeUndefined()
  })
})
