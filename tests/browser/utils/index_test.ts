import { isBrowser, without } from '@/utils'

describe('isBrowser', () => {
  it('should be defined', () => expect(isBrowser).toBeDefined())

  it('should be true when client side', () => expect(isBrowser).toBeTruthy())
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
