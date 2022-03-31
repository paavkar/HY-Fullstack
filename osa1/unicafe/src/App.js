import React, { useState } from 'react'

const Header = (props) => {
	return (
		<h4> {props.header} </h4>
	)
}


const Button = ({ onClick, text }) => (
	 <button onClick={onClick}>
		 {text}
	 </button>
)


const StatisticLine = (props) => {
	if (props.count === 3) 
		return (
	<tr> 
		<td> {props.text} </td>
		<td> {props.value} % </td>
	</tr>
	) 
	
	return (
	<tr> 
		<td> {props.text} </td>
		<td> {props.value} </td>
	</tr>
	)
	
}


const Statistics = (props) => {
	const count = 3
	if (props.all === 0) 
		return (
		<>
		<h4> Statistics </h4>
			No feedback given
		</>
		)
	return (
	<table>
	<tbody>
	<tr>
	<th> Statistics </th>
	</tr>
	  <StatisticLine text="good" value ={props.good} />
	  <StatisticLine text="neutral" value ={props.neutral} />
	  <StatisticLine text="bad" value ={props.bad} />
	  <StatisticLine text="all" value ={props.all} />
	  <StatisticLine text="average" value ={props.average} />
	  <StatisticLine text="positive" value ={props.positive} count={count} />
	 </tbody>
	 </table>
	)
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
	  setGood(good + 1)
  }
  
  const handleNeutralClick = () => {
	  setNeutral(neutral + 1)
  }
  
  const handleBadClick = () => {
	  setBad(bad + 1)
  }
  
  const all = good + neutral + bad
  const average = ((good*1)+(neutral*0)+(bad*-1))/all
  const positive = good/all*100 

  return (
    <>
    <Header header={'Give feedback'} />
	  <Button onClick={handleGoodClick} text='good' />
	  <Button onClick={handleNeutralClick} text='neutral' />
	  <Button onClick={handleBadClick} text='bad' />
	  <p></p>
	  <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </>
  )
}

export default App