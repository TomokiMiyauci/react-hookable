import { createRef, MutableRefObject } from 'react'

import { takeCurrent } from '@/shared'
describe('takeCurrent', () => {
  const ref = createRef() as MutableRefObject<number>

  ref.current = 100

  const table: [Record<string, unknown>, unknown][] = [
    [{}, {}],
    [{ current: 0 }, 0],
    [ref, 100]
  ]

  it.each(table)('should take current when it is ref', (value, expected) => {
    expect(takeCurrent(value)).toEqual(expected)
  })
})
