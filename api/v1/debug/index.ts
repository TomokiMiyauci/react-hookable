import type { APIHandler } from 'aleph/types.d.ts'

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms)
  })

export const handler: APIHandler = async ({ response }) => {
  response.addHeader('Access-Control-Allow-Origin', '*')
  await wait(5000)
  response.json({
    hello: 'world'
  })
}
