// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof EditProfile> = (args) => {
//   return <EditProfile {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import EditProfile from './EditProfile'

export const generated = () => {
  return <EditProfile />
}

export default {
  title: 'Components/EditProfile',
  component: EditProfile,
} as ComponentMeta<typeof EditProfile>
