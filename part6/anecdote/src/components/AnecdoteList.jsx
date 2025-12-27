import { voteAnecdote } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from "react-redux"
import { setNotif } from "../reducers/notifReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = Object.entries(anecdotes)
                              .filter(([text]) => text.toLowerCase().includes(filter.toLowerCase()))
                              .sort((a,b) => b[1]-a[1])

    return(
      <div>
        {filteredAnecdotes
          .map(([anecdote, votes] )=> (
          <div key={anecdote}>
            {anecdote} <br/>
            has {votes} votes 
            <button
              onClick={() => {
                dispatch(setNotif(`You voted ${anecdote}`))
                setTimeout(() => {
                  dispatch(setNotif(''))
                }, 5000)
                dispatch(voteAnecdote(anecdote))
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