import { renderHook } from '@testing-library/react-hooks/server'

import { useShortcutEffect } from '@/useShortcutEffect'

describe('useShortcutEffect', () => {
  it('should not throw error', () => {
    const onShortcut = jest.fn()
    const { result } = renderHook(() =>
      useShortcutEffect({
        keyMap: {},
        onShortcut
      })
    )

    expect(result.error).toBeUndefined()
  })
})
