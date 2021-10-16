import { act, renderHook } from '@testing-library/react-hooks'

import { useFetchEffect } from '@/useFetchEffect'

describe('useFetchEffect', () => {
  it('should be defined', () => expect(useFetchEffect).toBeDefined())

  it('should resolve fetch', async () => {
    global.fetch = jest.fn().mockResolvedValue({})
    const onResolve = jest.fn()
    renderHook(() =>
      useFetchEffect({
        input: '',
        onResolve
      })
    )

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await act(async () => {})

    expect(onResolve).toHaveBeenCalled()
  })
})
