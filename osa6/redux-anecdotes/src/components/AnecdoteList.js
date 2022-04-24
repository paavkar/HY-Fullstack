import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handleClick}) => {
  return(
    <div>
      {anecdote.content}
      <div onClick={handleClick}>
         has {anecdote.votes} 
         <button>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return(
    <div>
      {anecdotes.map(anecdote => 
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
          dispatch(voteAnecdote(anecdote.id))
        }
        />
      )}
    </div>
  )
}

export default AnecdoteList