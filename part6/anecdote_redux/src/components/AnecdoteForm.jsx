import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notifReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification("Added a new note", 10))
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote"/>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm