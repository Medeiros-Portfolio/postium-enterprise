// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SendToken> = (args) => {
//   return <SendToken {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import SendToken from './SendToken'

export const generated = () => {
  return <SendToken />
}

export default {
  title: 'Components/SendToken',
  component: SendToken,
} as ComponentMeta<typeof SendToken>
