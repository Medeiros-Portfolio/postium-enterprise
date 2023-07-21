import { render } from '@redwoodjs/testing/web'

import User from './User'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('User', () => {
  it('renders successfully', () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@fakeemail.com',
      avatar: 'https://cdn.filestackcontent.com/TMo43YTaQNK6UdY7SSen',
      roles: ['admin'],
    }

    expect(() => {
      render(
        <User
          avatar={user.avatar}
          email={user.email}
          id={user.id}
          name={user.name}
          roles={user.roles}
          key={(10 * Math.random()).toFixed(0)}
        />
      )
    }).not.toThrow()
  })
})
