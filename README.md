# react-hookable

[![codecov](https://codecov.io/gh/TomokiMiyauci/react-hookable/branch/main/graph/badge.svg?token=kb8KG2KSaR)](https://codecov.io/gh/TomokiMiyauci/react-hookable)

## State

Set of stateful value, and a function to update it. All functions are interfaces of `[state, dispatcher]`, like `useState`. However, a `dispatcher` may be an object with multiple update functions.

- [`useBoolean`](docs/useBoolean.mdx) - Switchable `boolean`
- [`useHash`](docs/useHash.mdx) - Tracks location hash value
- [`useNumber`](docs/useNumber.mdx) - Basic number counter

## Lifecycle

- [`useAsyncEffect`](docs/useAsyncEffect.mdx) - Hooks for asynchronous `useEffect`
- [`useAsyncMemo`](docs/useAsyncMemo.mdx) - Only recompute the memoized `async` value when one of the deps has changed
- [`useUpdateEffect`](docs/useUpdateEffect.mdx) - Hooks for effect on update dependency

## Utility

- [`useDebounce`](docs/useDebounce.mdx) - Safe debounce function that can be executed anywhere
- [`useEventListener`](docs/useEventListener.mdx) - Returns a set of event listeners `add` and `remove` functions that can be called anywhere. The event listeners will automatically be removed on unmount.
- [`useShortcut`](docs/useShortcut.mdx) - Hooks for `keydown` shortcut dispatcher
- [`useTimeout`](docs/useTimeout.mdx) - Safe timeout function that provides named timer setter and clearer, auto clear timer when unmounted
