import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const count = () => {
    const average = (store.getState().good * 1 + store.getState().ok * 0 + store.getState().bad * -1)/store.getState().all
    return average
  }

  const countPositive = () => {
    const positive = store.getState().good / store.getState().all * 100
    return positive
  }

  const Statistics = () => {
    if (store.getState().all === 0)
      return (
        <>
        <h1> Statistics </h1>
         No feedback given
        </>
      )
    return ( 
      <table>
        <tbody>
          <tr>
            <h1>Statistics</h1>
          </tr>
          <tr><td>good {store.getState().good}</td></tr>
          <tr><td>ok {store.getState().ok}</td></tr>
          <tr><td>bad {store.getState().bad}</td></tr>
          <tr><td>all {store.getState().all}</td></tr>
          <tr><td>average {count()}</td></tr>
          <tr><td>positive {countPositive()} %</td></tr>
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <Statistics/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
}

renderApp()
store.subscribe(renderApp)
