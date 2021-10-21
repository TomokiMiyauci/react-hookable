import { renderHook } from '@testing-library/react-hooks/server'

import { usePermissionQueryEffect } from '@/usePermissionQueryEffect'

describe('usePermissionQueryEffect', () => {
  it('should not throw error', () => {
    const { result } = renderHook(() =>
      usePermissionQueryEffect({
        permission: 'camera'
      })
    )

    expect(result.error).toBeUndefined()
  })
})
