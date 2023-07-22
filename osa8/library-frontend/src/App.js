import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

import { useQuery, useApolloClient } from '@apollo/client'

import { ALL_AUTHORS } from './queries'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        <Authors show={page === 'authors'} authors={result.data.allAuthors} />
        <Books show={page === 'books'} token={token} />
        <LoginForm
          setToken={setToken}
          setError={notify}
          show={page === 'login'}
          setPage={setPage}
        />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => logout()}>logout</button>
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} authors={result.data.allAuthors} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} />

      <Recommended show={page === 'recommended'} token={token} />
    </div>
  )
}

export default App
