import { useSelector, useDispatch } from "react-redux"
import { setNotification } from "../reducers/notifReducer"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = anecdotes
                              .filter (a => a.anecdote.toLowerCase().includes(filter))
                              .slice()
                              .sort((a, b) => b.votes - a.votes)

    return(
      <div>
        {filteredAnecdotes
          .map(anecdote => (
          <div key={anecdote.id}>
            {anecdote.anecdote} <br/>
            has {anecdote.votes} votes 
            <button
              onClick={() => {
                dispatch(voteAnecdote(anecdote))
                dispatch(setNotification(`You voted ${anecdote.anecdote}`, 10))
              }}
            >
              vote
            </button>      
          </div>
        ))}
      </div>
    )
}

export default AnecdoteList