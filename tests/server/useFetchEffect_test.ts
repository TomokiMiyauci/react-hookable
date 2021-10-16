import { renderHook } from '@testing-library/react-hooks/server'

import { useFetchEffect } from '@/useFetchEffect'

describe('useFetchEffect', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() =>
      useFetchEffect({
        input: ''
      })
    )

    expect(result.error).toBeUndefined()
  })
})
