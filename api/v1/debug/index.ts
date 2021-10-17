import type { APIHandler } from 'https://deno.land/x/aleph@v0.3.0-beta.19/types.d.ts'

const wait = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms)
  })

export const handler: APIHandler = async ({ response, router }) => {
  response.addHeader('Access-Control-Allow-Origin', '*')

  const strMs = router.query.get('wait')
  if (!strMs) {
    response.json({
      hello: 'world'
    })
    return
  }

  const ms = Number(strMs)
  if (isNaN(ms) || ms > 10000) {
    response.status = 400
    response.json('Invalid parameter: wait must be between 0 and 10000')
    return
  }

  await wait(ms)
  response.json({
    hello: 'world'
  })
}
