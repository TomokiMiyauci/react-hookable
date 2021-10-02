import { useState } from 'react'

/**
 * Hooks for toggler
 * @param initState - default:`false`
 */
const useToggle = (
	initState: boolean | (() => boolean) = false
): [boolean, (value?: boolean) => boolean] => {
	const [state, setState] = useState<boolean>(initState)

	const toggle = (value?: boolean): boolean => {
		const _v = typeof value === 'boolean' ? value : !state
		setState(_v)
		return _v
	}

	return [state, toggle]
}

export { useToggle }
