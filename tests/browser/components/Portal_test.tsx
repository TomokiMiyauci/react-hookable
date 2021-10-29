import { render } from '@testing-library/react'

import Portal from '@/components/Portal'

describe('Portal', () => {
  it('should be defined', () => expect(Portal).toBeDefined())

  it('should render under body', () => {
    const { getByTestId } = render(
      <Portal>
        <div data-testid="test"></div>
      </Portal>
    )
    expect(getByTestId('test')).toBeDefined()
  })
})
