import { render } from '@redwoodjs/testing/web'

import SignUpToken from './SignUpForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SignUpToken', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignUpToken />)
    }).not.toThrow()
  })
})
