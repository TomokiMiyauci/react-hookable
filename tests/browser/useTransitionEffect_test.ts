import { renderHook } from '@testing-library/react-hooks'
import { createRef } from 'react'

import { useTransitionEffect } from '@/useTransitionEffect'

describe('useTransitionEffect', () => {
  it('should be defined', () => expect(useTransitionEffect).toBeDefined())

  it('should', () => {
    renderHook(() =>
      useTransitionEffect({
        target: createRef()
      })
    )
  })
})
