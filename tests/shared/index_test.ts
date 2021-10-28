import { createRef, MutableRefObject } from 'react'

import {
  takeCurrent,
  takeTarget,
  cleanSplittedClassName,
  onTakeTarget
} from '@/shared'

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

describe('cleanSplittedClassName', () => {
  const table: [string, string[]][] = [
    ['aaa', ['aaa']],
    ['aaa bbb', ['aaa', 'bbb']],
    ['aaa bbb ', ['aaa', 'bbb']],
    [' aaa  bbb ', ['aaa', 'bbb']],
    ['   a   b   c   d  ', ['a', 'b', 'c', 'd']],
    [' a a b b ', ['a', 'b']],
    ['', []],
    ['   ', []]
  ]

  it.each(table)('cleanSplittedClassName(%s) => %s', (className, expected) => {
    expect(cleanSplittedClassName(className)).toEqual(expected)
  })
})

describe('onTakeTarget', () => {
  it('should call fn when target is not empty', () => {
    const el = document.createElement('el')
    const fn = jest.fn()
    onTakeTarget(el, fn)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(el)
  })

  it('should not call fn when target is empty', () => {
    const el = createRef<EventTarget>()
    const fn = jest.fn()
    onTakeTarget(el, fn)
    expect(fn).not.toHaveBeenCalled()
  })
})
