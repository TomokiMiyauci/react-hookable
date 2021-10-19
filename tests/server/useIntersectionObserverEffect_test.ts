import { renderHook } from '@testing-library/react-hooks/server'
import { createRef } from 'react'

import { useIntersectionObserverEffect } from '@/useIntersectionObserverEffect'
describe('useIntersectionObserverEffect', () => {
  it('should not throw error', () => {
    const callback = jest.fn()
    const target = createRef<HTMLDivElement>()

    const { result } = renderHook(() =>
      useIntersectionObserverEffect({
        target,
        callback
      })
    )

    expect(result.error).toBeUndefined()
  })
})
