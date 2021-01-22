import React from 'react'

const Course = (props) => {
	
	return(
	<div>
		<Header courses={props.courses} />
		{props.courses.parts.map(part => 
			<Content key={part.id} part={part} />
		)}
		<Total id={props.id} total={props.total}/>
	</div>
	  )
}

const Header = ({courses}) => {
	return (
	 <div>
	  <h1> {courses.name} </h1>
	 </div>
	)
}

const Part = ({part, exercises}) => {
	return (
	  <li> {part} {exercises} </li>
	)
}

const Content = ({part}) => {
	return (
	  <div> 
	  <Part part={part.name} exercises={part.exercises}/>
	  </div>
	)
}

const Total = ({id, total}) => {
	console.log(total)
	return (
    <>
    <h4>total of {total[id-1]} exercises</h4>
    </>
    )
}


export default Course