import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('write blog title here')
  const author = screen.getByPlaceholderText('write blog author here')
  const url = screen.getByPlaceholderText('write blog url here')
  const sendButton = screen.getByText('create')

  userEvent.type(title, 'Testing blog form' )
  userEvent.type(author, 'Paavo Karppinen' )
  userEvent.type(url, 'https://github.com/paavkar' )
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing blog form' )
  expect(createBlog.mock.calls[0][0].author).toBe('Paavo Karppinen' )
  expect(createBlog.mock.calls[0][0].url).toBe('https://github.com/paavkar' )
})