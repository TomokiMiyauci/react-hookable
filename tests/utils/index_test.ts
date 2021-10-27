import { uniqShallow, without } from '@/utils'

describe('uniqShallow', () => {
  const table: [unknown[], unknown[]][] = [
    [[1], [1]],
    [
      [0, 1, 0, 1],
      [0, 1]
    ],
    [
      [0, '', false, 1, 1, false],
      [0, '', false, 1]
    ],
    [
      [{}, { a: {} }, { a: {} }],
      [{}, { a: {} }, { a: {} }]
    ]
  ]

  it.each(table)('uniqShallow(%s) => %s', (value, expected) => {
    expect(uniqShallow(value)).toEqual(expected)
  })
})

describe('without', () => {
  const table: [unknown[], unknown[], unknown[]][] = [
    [[], [], []],
    [[''], ['a'], ['']],
    [[1, 2, 3, 4], [2], [1, 3, 4]],
    [[1, 2, 3, 3, 4], [2], [1, 3, 4]]
  ]
  it.each(table)('without(%s, %s) => %s', (a, b, expected) => {
    expect(without(a, b)).toEqual(expected)
  })
})
