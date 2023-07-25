import { render } from '@redwoodjs/testing/web'

import SignInToken from './SignInToken'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SignInToken', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignInToken />)
    }).not.toThrow()
  })
})
