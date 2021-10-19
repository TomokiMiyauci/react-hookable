import { renderHook } from '@testing-library/react-hooks/server'

import { useIdleEffect } from '@/useIdleEffect'

describe('useIdleEffect', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() => useIdleEffect({}))

    expect(result.error).toBeUndefined()
  })
})
