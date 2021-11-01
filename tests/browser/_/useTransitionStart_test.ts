import { getMs, str2NumOrZero, x1000, cleanTime } from '@/_/useTransitionStart'

describe('getMs', () => {
  const table: [string, string][] = [
    ['', ''],
    ['0s', '0'],
    ['0.3s', '0.3'],
    ['aaa', '']
  ]
  it.each(table)('getMs(%s) => %s', (value, expected) => {
    expect(getMs(value)).toBe(expected)
  })
})

describe('str2NumOrZero', () => {
  const table: [string, number][] = [
    ['', 0],
    ['0', 0],
    ['0.3', 0.3],
    ['0.0001', 0.0001],
    ['aaaa', 0]
  ]
  it.each(table)('str2NumOrZero(%s) => %d', (value, expected) => {
    expect(str2NumOrZero(value)).toBe(expected)
  })
})

describe('x1000', () => {
  const table: [number, number][] = [
    [0, 0],
    [1, 1000],
    [0.1, 100]
  ]
  it.each(table)('x1000(%d) => %d', (value, expected) => {
    expect(x1000(value)).toBe(expected)
  })
})

describe('cleanTime', () => {
  const table: [string, number][] = [
    ['0s', 0],
    ['0.1s', 100],
    ['aaaa', 0],
    ['', 0],
    ['0.01s', 10]
  ]
  it.each(table)('cleanTime($s) => %d', (value, expected) => {
    expect(cleanTime(value)).toBe(expected)
  })
})
