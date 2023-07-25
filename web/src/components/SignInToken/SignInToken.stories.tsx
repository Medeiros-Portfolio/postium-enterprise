// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SignInToken> = (args) => {
//   return <SignInToken {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import SignInToken from './SignInToken'

export const generated = () => {
  return <SignInToken />
}

export default {
  title: 'Components/SignInToken',
  component: SignInToken,
} as ComponentMeta<typeof SignInToken>
