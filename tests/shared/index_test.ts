import { createRef, MutableRefObject } from 'react'

import { takeCurrent, takeTarget } from '@/shared'
import { Target } from '@/shared/types'
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

describe('takeTarget', () => {
  const table: [Target<EventTarget>, EventTarget][] = [
    [document.createElement('div'), document.createElement('div')],
    [() => window, window],
    [{ current: document }, document]
  ]
  it.each(table)('should take target safety', (target, expected) => {
    expect(takeTarget(target)).toEqual(expected)
  })
})
