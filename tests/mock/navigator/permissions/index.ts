const mockPermissions = (): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockQuery: jest.Mock<any, any>
} => {
  const mockQuery = jest.fn()
  Object.defineProperty(global.navigator, 'permissions', {
    configurable: true,
    value: {
      query: mockQuery
    }
  })

  return {
    mockQuery
  }
}

export { mockPermissions }
