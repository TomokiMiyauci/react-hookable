import { renderHook } from '@testing-library/react-hooks/server'
import { createRef } from 'react'

import { useTouchEffect } from '@/useTouchEffect'

describe('useTouchEffect', () => {
  it('should not throw error', () => {
    const target = createRef<HTMLElement>()
    const { result } = renderHook(() => useTouchEffect({ target }, []))

    expect(result.error).toBeUndefined()
  })
})
