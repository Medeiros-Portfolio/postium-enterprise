// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof User> = (args) => {
//   return <User {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import User from './User'

export const generated = () => {
  return <User />
}

export default {
  title: 'Components/User',
  component: User,
} as ComponentMeta<typeof User>
