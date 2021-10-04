import type { Meta } from '@storybook/preact'
import type { FunctionComponent } from 'preact'

import { useToggle } from '@/useToggle'

const Demo: FunctionComponent = () => {
  const [state, toggle] = useToggle()

  return (
    <>
      <p>Value: {String(state)}</p>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => toggle(true)}>Set on</button>
      <button onClick={() => toggle(false)}>Set off</button>
    </>
  )
}

const meta: Meta<typeof Demo> = {
  title: 'hooks/useToggle',
  component: Demo
}

export default meta
export { Demo }
