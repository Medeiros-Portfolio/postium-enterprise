import { render } from '@redwoodjs/testing/web'

import SendToken from './SendToken'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SendToken', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SendToken />)
    }).not.toThrow()
  })
})
