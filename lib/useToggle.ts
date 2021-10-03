import { useState } from 'react'

/**
 * Hooks for toggler
 * @param initialState - default:`false`
 * @returns A stateful value, and a toggle function to update it.
 *
 * @example
 * ```ts
 * const [state, toggle] = useToggle(false)
 * state // false
 * toggle()
 * state // true
 * toggle()
 * state // false
 * ```
 */
const useToggle = (
	initialState: boolean | (() => boolean) = false
): [boolean, (value?: boolean) => boolean] => {
	const [state, setState] = useState<boolean>(initialState)

	const toggle = (value?: boolean): boolean => {
		const _v = typeof value === 'boolean' ? value : !state
		setState(_v)
		return _v
	}

	return [state, toggle]
}

export { useToggle }
