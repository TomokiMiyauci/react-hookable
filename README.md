# react-hookable

Collection of essential React Composition Utilities

[![codecov](https://codecov.io/gh/TomokiMiyauci/react-hookable/branch/main/graph/badge.svg?token=kb8KG2KSaR)](https://codecov.io/gh/TomokiMiyauci/react-hookable)

## Feature

- Consistent interface
- Pure TypeScript
- Full support for preact
- Full support for Deno
- Tested with CSR and SSR

## Install

### Node.js

```bash
npm i react-hook@beta
// or
yarn add react-hook@beta
```

### Deno

```ts
import {*} from 'https://esm.sh/react-hookable'
```

## Type of hooks

We have classified hooks into seven categories.
Each category has a different interface.

- [State](#state) => `[state/{ states }, dispatcher/{ dispatchers }]`
- [Effect](#effect) => `void`
- [EffectState](#effect-state) => `[state/{ states }, dispatcher/{ dispatchers }]`
- [Ref](#ref) => `{ _ref, ... }`
- [Procedure](#procedure) => `{ appliers }`
- [Enhancement](#enhancement) extends `react` / `preact` standard hooks
- [Lifecycle](#lifecycle) Component lifecycle

Each function that contains a side-effect also has an

![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black) tag.

## StateSet

Set of stateful value, and a function to update it. All functions are interfaces of `[state, dispatcher]`, like `useState`.

### Interface

```tsx
const [state, dispatcher] = useMyState(...)
// state: state/{ states }
// dispatcher: dispatch/{ dispatches }
```

- [`useBoolean`](docs/useBoolean.mdx) - Switchable `boolean` [![tag][demo]](https://react-hookable.vercel.app/?path=/story/state-useboolean)
- [`useNumber`](docs/useNumber.mdx) - Basic number counter [![tag][demo]](https://react-hookable.vercel.app/?path=/story/state-usenumber)
- [`useHashState`](docs/useHashState.mdx) - Tracks location hash value [![tag][demo]](https://react-hookable.vercel.app/?path=/story/stateset-usehashstate) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)
- [`useSequenceState`](docs/useSequenceState.mdx) - Prevents other processes from running until the end of the process. This is ideal for preventing chattering. [![tag][demo]](https://react-hookable.vercel.app/?path=/story/stateset-usesequencestate)
- [`useWindowScrollState`](docs/useWindowScrollState.mdx) - Reactive window scroll [![tag][demo]](https://react-hookable.vercel.app/?path=/story/stateset-usewindowscrollstate) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)

## Effect

Effect deals with side effects. It does not have a return value like `useEffect`. It takes as argument a `condition` function that handles the effect dynamically.

### Interface

```tsx
useMyEffect(effect, deps, () => Maybe<boolean>) // void
```

- [`useAnimationFrameEffect`](docs/useAnimationFrameEffect.mdx) - Effect for `requestAnimationFrame` that clear automatically when unmount [![tag][demo]](https://react-hookable.vercel.app/?path=/story/effect-useanimationframeeffect)
- [`useEventListenerEffect`](docs/useEventListenerEffect.mdx) - `EventListener` effect that clean up automatically [![tag][demo]](https://react-hookable.vercel.app/?path=/story/effect-useeventlistenereffect)
- [`useFetchEffect`](docs/useFetchEffect.mdx) - Auto aborting `fetch` API effect [![tag][demo]](https://react-hookable.vercel.app/?path=/story/effect-usefetcheffect)
- [`useIntervalEffect`](docs/useIntervalEffect.mdx) - Effect for `setInterval` that clear automatically when unmount [![tag][demo]](https://react-hookable.vercel.app/?path=/story/effect-useintervaleffect)
- [`useTouchEffect`](docs/useTouchEffect.mdx) - `TouchEvents` effect [![tag][demo]](https://react-hookable.vercel.app/?path=/story/effect-usetoucheffect)
- [`useShortcutEffect`](docs/useShortcutEffect.mdx) - Effect for `keydown` as shortcut [![tag][demo]](https://react-hookable.vercel.app/?path=/story/effect-useshortcuteffect)
- [`useTimeoutEffect`](docs/useTimeoutEffect.mdx) - `Timeout` effect what timer clear automatically on unmount [![tag][demo]](https://react-hookable.vercel.app/?path=/story/effect-usetimeouteffect)

## Effect State

Effect State is a hook to handle side effects with reactive state. Effect is an extension of `useEffect` with a conditional execution.
The return value is a set of reactive states and their dispatches.

### Interface

```tsx
const [states, dispatches] = useEffectState(options, deps, condition)
```

- [`useSwipeEffectState`](docs/useSwipeEffectState.mdx) - Reactive swipe detection based on `TouchEvents` [![tag][demo]](https://react-hookable.vercel.app/?path=/story/effectstate-useswipeeffectstate)

### Ref

Ref is a utility for `useRef`. The return value of all hooks is a key value object, containing the original `_ref`.

### Interface

```tsx
const { ..., _ref: MutableObject | RefObject } = useMyRef()
```

- [`useIsFirstMountRef`](docs/useIsFirstMountRef.mdx) - Ref of first mount or not. [![tag][demo]](https://react-hookable.vercel.app/?path=/story/ref-useidfirstmountref)

## Procedure

A collection of functions that depend on `ref`. Often causes side effects. There are no reactive states. As an escape hatch, an internal `ref` can be referenced from a `_ref`.

### Interface

```tsx
const { appliers, _ref } = useProcedure(...)
```

- [`useEventListener`](docs/useEventListener.mdx) - Returns a set of event listeners `add` and `remove` functions that can be called anywhere. The event listeners will automatically be removed on unmount. [![tag][demo]](https://react-hookable.vercel.app/?path=/story/procedure-useeventlistener) ![side-effect](https://img.shields.io/badge/side%20effect-%F0%9F%92%A5-black)

## Enhancement

These are highly abstract hooks that enhance the standard hooks in `react` or `preact`.

- [`useAsyncEffect`](docs/useAsyncEffect.mdx) - Hooks for asynchronous `useEffect` [![tag][demo]](https://react-hookable.vercel.app/?path=/story/enhancement-useasynceffect)
- [`useAsyncMemo`](docs/useAsyncMemo.mdx) - Only recompute the memoized `async` value when one of the deps has changed [![tag][demo]](https://react-hookable.vercel.app/?path=/story/enhancement-useasyncmemo)
- [`useUpdateEffect`](docs/useUpdateEffect.mdx) - Hooks for effect on update dependency [![tag][demo]](https://react-hookable.vercel.app/?path=/story/enhancement-useupdateeffect)
- [`useConditionalEffect`](docs/useConditionalEffect.mdx) - `useEffect` with conditional function [![tag][demo]](https://react-hookable.vercel.app/?path=/story/enhancement-useconditionaleffect)

## Lifecycle

Component lifecycle

- [`useIsUnmounted`](docs/useIsUnmounted.mdx) - Ref of isUnmounted or not [![tag][demo]](https://react-hookable.vercel.app/?path=/story/lifecycle-useisunmounted)
- [`useUnmount`](docs/useUnmount.mdx) - Register unmount callback [![tag][demo]](https://react-hookable.vercel.app/?path=/story/lifecycle-useunmount)

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
