import { renderToStaticMarkup } from 'react-dom/server'

import Portal from '@/components/Portal'
describe('Portal', () => {
  it('should not throw error', () => {
    expect(() =>
      renderToStaticMarkup(
        <Portal>
          <></>
        </Portal>
      )
    ).not.toThrow()
  })
})
