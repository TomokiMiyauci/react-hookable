import { render, fireEvent } from '@testing-library/react'

import UseClickOutside from '@/components/UseClickOutside'

describe('UseClickOutside', () => {
  it('should be defined', () => expect(UseClickOutside).toBeDefined())

  it('should return ref', () => {
    render(
      <UseClickOutside onClickOutside={jest.fn()}>
        {({ ref }) => {
          expect(ref).toEqual({
            current: null
          })
          return <></>
        }}
      </UseClickOutside>
    )
  })

  it('should call onClickOutside when click outside node', () => {
    const onClickOutside = jest.fn()

    const { getByTestId } = render(
      <div data-testid="outside">
        <UseClickOutside<HTMLDivElement> onClickOutside={onClickOutside}>
          {({ ref }) => {
            return <div data-testid="inside" ref={ref}></div>
          }}
        </UseClickOutside>
      </div>
    )

    expect(onClickOutside).not.toHaveBeenCalled()

    fireEvent.click(getByTestId('outside'))
    expect(onClickOutside).toHaveBeenCalledTimes(1)

    fireEvent.click(getByTestId('inside'))
    expect(onClickOutside).toHaveBeenCalledTimes(1)
  })
})
