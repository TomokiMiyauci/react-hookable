---
to: lib/<%= name %>.ts
---

type <%= h.changeCase.pascal(name) %>Options = {}

/**
 *
 * @example
 * ```tsx
 *
 * ```
 *
 * @see https://react-hookable.vercel.app/?path=/story/<%= category %>-<%= h.changeCase.lower(name) %>
 * @beta
 */
const <%= name %> = () => {}

export { <%= name %> }
export type { <%= h.changeCase.pascal(name) %>Options }
