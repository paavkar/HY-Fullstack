import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('testing the blog rendering', () => {

  const user = {
    username: 'paavkar',
    name: 'Paavo Karppinen'
  }

  const blog = {
    title: 'Testing the blog rendering with react-testing library',
    author: 'Paavo Karppinen',
    url: 'https://github.com/paavkar',
    likes: 5,
    user: user
  }


  test('renders content', () => {

    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.partialInfo')

    expect(div).toHaveTextContent('Testing the blog rendering with react-testing library')
    expect(div).toHaveTextContent('Paavo Karppinen')
  })

  test('clicking the button shows full info', () => {
    const { container } = render(<Blog blog={blog} user={user}/>)
    const div = container.querySelector('.fullInfo')

    const button = screen.getByText('view')
    userEvent.click(button)

    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the button calls event handler twice', async () => {

    const mockHandler = jest.fn()

    render(
      <Blog blog={blog} user={user} addLike={mockHandler} />
    )

    const button = screen.getByText('like')
    userEvent.dblClick(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
