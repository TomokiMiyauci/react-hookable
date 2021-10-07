# react-hookable

[![codecov](https://codecov.io/gh/TomokiMiyauci/react-hookable/branch/main/graph/badge.svg?token=kb8KG2KSaR)](https://codecov.io/gh/TomokiMiyauci/react-hookable)

## Lifecycle

- [`useAsyncEffect`](docs/useAsyncEffect.mdx) - Hooks for asynchronous `useEffect`
- [`useAsyncMemo`](docs/useAsyncMemo.mdx) - Only recompute the memoized `async` value when one of the deps has changed
- [`useUpdateEffect`](docs/useUpdateEffect.mdx) - Hooks for effect on update dependency

## Utility

- [`useBoolean`](docs/useBoolean.mdx) - Switchable `boolean`
- [`useDebounce`](docs/useDebounce.mdx) - Safe debounce function that can be executed anywhere
- [`useEventListener`](docs/useEventListener.mdx) - Returns a set of event listeners `add` and `remove` functions that can be called anywhere. The event listeners will automatically be removed on unmount.
- [`useNumber`](docs/useNumber.mdx) - Basic number counter
- [`useShortcut`](docs/useShortcut.mdx) - Hooks for `keydown` shortcut dispatcher
- [`useTimeout`](docs/useTimeout.mdx) - Safe timeout function that provides named timer setter and clearer, auto clear timer when unmounted
