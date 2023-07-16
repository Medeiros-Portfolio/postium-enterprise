import { render, screen } from '@redwoodjs/testing/web'

import AboutPage from './AboutPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AboutPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AboutPage />)
    }).not.toThrow()
  })

  it('has a heading with Frequently Asked Questions', () => {
    render(<AboutPage />)
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
  })
})
