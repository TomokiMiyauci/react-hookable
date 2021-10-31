import { render, fireEvent } from '@testing-library/react'

import UseClickOutside from '@/components/UseClickOutside'

describe('UseClickOutside', () => {
  it('should be defined', () => expect(UseClickOutside).toBeDefined())

  it('should not throw error', () => {
    expect(() =>
      render(
        <UseClickOutside onClickOutside={jest.fn()}>
          <div data-testid="fff" />
        </UseClickOutside>
      )
    ).not.toThrow()
  })

  it('should call defined event', () => {
    const onClickOutside = jest.fn()
    const onClickInside = jest.fn()
    const { getByTestId } = render(
      <div data-testid="outside">
        <UseClickOutside
          onClickOutside={onClickOutside}
          onClickInside={onClickInside}
        >
          <div data-testid="inside" />
        </UseClickOutside>
      </div>
    )

    expect(onClickOutside).not.toHaveBeenCalled()
    expect(onClickInside).not.toHaveBeenCalled()

    fireEvent.click(getByTestId('outside'))
    expect(onClickOutside).toHaveBeenCalledTimes(1)
    expect(onClickInside).not.toHaveBeenCalled()

    fireEvent.click(getByTestId('inside'))
    expect(onClickOutside).toHaveBeenCalledTimes(1)
    expect(onClickInside).toHaveBeenCalledTimes(1)
  })

  it('should return ref', () => {
    render(
      <UseClickOutside<HTMLElement> onClickOutside={jest.fn()}>
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
