import { renderHook } from '@testing-library/react-hooks/server'

import { useAsyncMemo } from '@/useAsyncMemo'

describe('useAsyncMemo', () => {
  const factory = jest.fn()
  it('should not throw error', () => {
    const { result } = renderHook(() => useAsyncMemo(factory))

    expect(factory).not.toHaveBeenCalled()
    expect(result.error).toBeUndefined()
    expect(result.current).toBeUndefined()
  })
})
