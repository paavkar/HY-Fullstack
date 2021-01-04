import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
	<button onClick={onClick}>
		{text}
	</button>
)

const points = new Uint8Array(6)
const copy = [...points]

const App = (props) => {
	const [selected, setSelected] = useState(0)
  const handleClick = () => {
		setSelected(Math.floor(Math.random() * 6));
	}

	/** The counter doesn't update in browser until you click "next anecdote", but id does count the votes */
	const handleVote = () => {
		copy[selected] += 1
		console.log(copy)
	}
	
  return (
  <div>
		<h1>
		Anecdote of the day
		</h1>
      {props.anecdotes[selected]}
			<p>{'has ' + copy[selected] + ' votes' } </p>
	  	<Button onClick={handleVote} text='vote' />
	  	<Button onClick={handleClick} text='next anecdote' />
		<h1>
		Anecdote with most votes
 		</h1>
	  	{props.anecdotes[copy.indexOf(Math.max(...copy))]}
			<p>{'has ' + Math.max(...copy) + ' votes' }</p>
  </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)