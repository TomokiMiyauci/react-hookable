# react-hookable

Collection of essential React Composition Utilities

[![codecov](https://codecov.io/gh/TomokiMiyauci/react-hookable/branch/main/graph/badge.svg?token=kb8KG2KSaR)](https://codecov.io/gh/TomokiMiyauci/react-hookable)

## Feature

- Pure TypeScript
- Full support for preact
- Full support for Deno
- Tested with CSR and SSR

## Install

```bash
npm i react-hook@beta
// or
yarn add react-hook@beta
```

## Type of hooks

We have classified hooks into three categories.
Each category has a different interface.

- [StateSet](#stateset) => `[state/{ states }, dispatcher/{ dispatchers }]`
- [Procedure](#procedure) => `{ appliers }`
- [Enhancement](#enhancement) extends `react` / `preact` standard hooks

Each function that contains a side-effect also has an

![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black) tag.

## StateSet

Set of stateful value, and a function to update it. All functions are interfaces of `[state, dispatcher]`, like `useState`.

### Interface

```tsx
const [state, dispatcher] = useStateSet(...)
// state: state/{ states }
// dispatcher: dispatch/{ dispatches }
```

- [`useBoolean`](docs/useBoolean.mdx) - Switchable `boolean` [![tag][demo]](https://react-hookable.vercel.app/?path=/story/stateset-useboolean)
- [`useHash`](docs/useHash.mdx) - Tracks location hash value [![tag][demo]](https://react-hookable.vercel.app/?path=/story/stateset-usehash) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)
- [`useNumber`](docs/useNumber.mdx) - Basic number counter [![tag][demo]](https://react-hookable.vercel.app/?path=/story/stateset-usenumber)

## Procedure

A collection of functions that depend on `ref`. Often causes side effects. There are no reactive states. As an escape hatch, an internal `ref` can be referenced from a `_ref`.

### Interface

```tsx
const { appliers, _ref } = useProcedure(...)
```

- [`useDebounce`](docs/useDebounce.mdx) - Safe debounce function that can be executed anywhere [![tag][demo]](https://react-hookable.vercel.app/?path=/story/procedure-usedebounce) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)
- [`useEventListener`](docs/useEventListener.mdx) - Returns a set of event listeners `add` and `remove` functions that can be called anywhere. The event listeners will automatically be removed on unmount. [![tag][demo]](https://react-hookable.vercel.app/?path=/story/procedure-useeventlistener) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)
- [`useShortcut`](docs/useShortcut.mdx) - Hooks for `keydown` shortcut dispatcher [![tag][demo]](https://react-hookable.vercel.app/?path=/story/procedure-useshortcut) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)
- [`useTimeout`](docs/useTimeout.mdx) - Safe timeout function that provides named timer setter and clearer, auto clear timer when unmounted [![tag][demo]](https://react-hookable.vercel.app/?path=/story/procedure-usetimeout) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)
- [`useUnmount`](docs/useUnmount.mdx) - Register unmount callback [![tag][demo]](https://react-hookable.vercel.app/?path=/story/procedure-useunmount)

## Enhancement

These are highly abstract hooks that enhance the standard hooks in `react` or `preact`.

- [`useAsyncEffect`](docs/useAsyncEffect.mdx) - Hooks for asynchronous `useEffect` [![tag][demo]](https://react-hookable.vercel.app/?path=/story/enhancement-useasynceffect)
- [`useAsyncMemo`](docs/useAsyncMemo.mdx) - Only recompute the memoized `async` value when one of the deps has changed [![tag][demo]](https://react-hookable.vercel.app/?path=/story/enhancement-useasyncmemo)
- [`useUpdateEffect`](docs/useUpdateEffect.mdx) - Hooks for effect on update dependency [![tag][demo]](https://react-hookable.vercel.app/?path=/story/enhancement-useupdateeffect)

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check
[issues](https://github.com/TomokiMiyauci/utterances-component/issues).

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/tomoki_miyauci">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## License

Copyright © 2021-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license

[demo]: https://img.shields.io/badge/demo-%F0%9F%9A%80-green
