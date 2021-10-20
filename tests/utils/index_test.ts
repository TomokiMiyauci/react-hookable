import { isBrowser } from '@/utils'

describe('isBrowser', () => {
  it('should be defined', () => expect(isBrowser).toBeDefined())

  it('should be true when client side', () => expect(isBrowser).toBeTruthy())
})
