import { renderHook } from '@testing-library/react-hooks'

import { usePermissionQueryEffect } from '@/usePermissionQueryEffect'

describe('usePermissionQueryEffect', () => {
  it('should be defined', () => expect(usePermissionQueryEffect).toBeDefined())

  it('should', () => {
    renderHook(() =>
      usePermissionQueryEffect({
        permission: 'camera'
      })
    )
  })
})
