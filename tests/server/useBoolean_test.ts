/**
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react-hooks/server'

import { useBoolean } from '@/useBoolean'

describe('useBoolean', () => {
  it('should hydrate on success', () => {
    const { result, hydrate } = renderHook(() => useBoolean())

    hydrate()

    act(() => {
      result.current[1].on()
    })

    expect(result.current[0]).toBeTruthy()
  })
})
