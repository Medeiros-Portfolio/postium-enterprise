import { render } from '@redwoodjs/testing/web'

import Comment from './Comment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Comment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Comment
          id={465}
          message="message"
          name="name"
          createdAt={new Date().toDateString()}
        />
      )
    }).not.toThrow()
  })
})
