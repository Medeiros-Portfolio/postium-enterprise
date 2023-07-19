import { render } from '@redwoodjs/testing/web'

import EditProfile from './EditProfile'
import { standard } from './EditProfile.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditProfile', () => {
  it('renders successfully', () => {
    const { avatar, email, name } = standard().user

    expect(() => {
      mockCurrentUser(standard().user)
      render(<EditProfile avatar={avatar} name={name} email={email} />)
    }).not.toThrow()
  })
})
