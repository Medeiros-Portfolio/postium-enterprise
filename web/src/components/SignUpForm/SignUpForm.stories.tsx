// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SignUpToken> = (args) => {
//   return <SignUpToken {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import SignUpToken from './SignUpForm'

export const generated = () => {
  return <SignUpToken />
}

export default {
  title: 'Components/SignUpToken',
  component: SignUpToken,
} as ComponentMeta<typeof SignUpToken>
