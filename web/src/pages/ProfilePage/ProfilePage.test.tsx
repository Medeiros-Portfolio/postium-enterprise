import { render } from '@redwoodjs/testing/web'

import ProfilePage from './ProfilePage'
import { standard } from './ProfilePage.mock'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      mockCurrentUser(standard().user)
      render(<ProfilePage />)
    }).not.toThrow()
  })
})
