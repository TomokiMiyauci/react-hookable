# react-hookable

[![codecov](https://codecov.io/gh/TomokiMiyauci/react-hookable/branch/main/graph/badge.svg?token=kb8KG2KSaR)](https://codecov.io/gh/TomokiMiyauci/react-hookable)

## Type of hooks

We have classified hooks into three categories.
Each category has a different interface.

- [State](#state) => `[state, dispatcher/{ dispatchers }]`
- [Stateless](#stateless) => `{ appliers }`
- [Lifecycle](#lifecycle)`(..., deps)` => void

Each function that contains a side-effect also has an

![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black) tag.

## State

Set of stateful value, and a function to update it. All functions are interfaces of `[state, dispatcher]`, like `useState`. However, a `dispatcher` may be an object with multiple update functions.

- [`useBoolean`](docs/useBoolean.mdx) - Switchable `boolean` [![tag][demo]](https://react-hookable.vercel.app/?path=/story/state-useboolean)
- [`useHash`](docs/useHash.mdx) - Tracks location hash value [![tag][demo]](https://react-hookable.vercel.app/?path=/story/state-usehash) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)
- [`useNumber`](docs/useNumber.mdx) - Basic number counter [![tag][demo]](https://react-hookable.vercel.app/?path=/story/state-usenumber)

## Stateless

A function with no stateful value. Typically, a set of `add` and `remove` functions that can safely handle side effects.

- [`useDebounce`](docs/useDebounce.mdx) - Safe debounce function that can be executed anywhere [![tag][demo]](https://react-hookable.vercel.app/?path=/story/stateless-usedebounce) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)
- [`useEventListener`](docs/useEventListener.mdx) - Returns a set of event listeners `add` and `remove` functions that can be called anywhere. The event listeners will automatically be removed on unmount. [![tag][demo]](https://react-hookable.vercel.app/?path=/story/stateless-useeventlistener) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)
- [`useShortcut`](docs/useShortcut.mdx) - Hooks for `keydown` shortcut dispatcher [![tag][demo]](https://react-hookable.vercel.app/?path=/story/stateless-useshortcut) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)
- [`useTimeout`](docs/useTimeout.mdx) - Safe timeout function that provides named timer setter and clearer, auto clear timer when unmounted [![tag][demo]](https://react-hookable.vercel.app/?path=/story/stateless-usetimeout) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)

## Lifecycle

- [`useAsyncEffect`](docs/useAsyncEffect.mdx) - Hooks for asynchronous `useEffect` [![tag][demo]](https://react-hookable.vercel.app/?path=/story/lifecyle-useasynceffect)
- [`useAsyncMemo`](docs/useAsyncMemo.mdx) - Only recompute the memoized `async` value when one of the deps has changed [![tag][demo]](https://react-hookable.vercel.app/?path=/story/lifecyle-useasyncmemo)
- [`useUpdateEffect`](docs/useUpdateEffect.mdx) - Hooks for effect on update dependency [![tag][demo]](https://react-hookable.vercel.app/?path=/story/lifecycle-useupdateeffect)

[demo]: https://img.shields.io/badge/demo-%F0%9F%9A%80-green
