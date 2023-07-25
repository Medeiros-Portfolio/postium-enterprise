import type { ComponentMeta } from '@storybook/react'

import PasswordlessAuthPage from './PasswordlessAuthPage'

export const generated = () => {
  return <PasswordlessAuthPage />
}

export default {
  title: 'Pages/PasswordlessAuthPage',
  component: PasswordlessAuthPage,
} as ComponentMeta<typeof PasswordlessAuthPage>
