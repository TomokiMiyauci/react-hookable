import { renderToStaticMarkup } from 'react-dom/server'

import UseClickOutside from '@/components/UseClickOutside'

describe('UseClickOutside', () => {
  it('should not throw error', () => {
    expect(() =>
      renderToStaticMarkup(
        <UseClickOutside onClickOutside={jest.fn()}>
          <div />
        </UseClickOutside>
      )
    ).not.toThrow()
  })
})
