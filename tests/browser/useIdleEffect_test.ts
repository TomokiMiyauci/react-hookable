import { renderHook } from '@testing-library/react-hooks'

import { useIdleEffect } from '@/useIdleEffect'

describe('useIdleEffect', () => {
  it('should be defined', () => expect(useIdleEffect).toBeDefined())

  it('should', () => {
    renderHook(() => useIdleEffect({}))
  })
})
