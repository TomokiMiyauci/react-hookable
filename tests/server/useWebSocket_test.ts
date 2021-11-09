import { renderHook } from '@testing-library/react-hooks/server'

import { useWebSocket } from '@/useWebSocket'

describe('useWebSocket', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() =>
      useWebSocket({
        url: '',
        data: ''
      })
    )

    expect(result.error).toBeUndefined()
  })
})
