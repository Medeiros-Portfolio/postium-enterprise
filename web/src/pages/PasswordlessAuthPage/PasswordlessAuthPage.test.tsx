import { render } from '@redwoodjs/testing/web'

import PasswordlessAuthPage from './PasswordlessAuthPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PasswordlessAuthPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PasswordlessAuthPage />)
    }).not.toThrow()
  })
})
