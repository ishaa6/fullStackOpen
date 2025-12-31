import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const AnecdoteForm = () => {
    const queryClient = useQueryClient()

    const anecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
          const anecdotes = queryClient.getQueryData(['anecdotes'])
          queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        }
    })

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        anecdoteMutation.mutate({anecdote:content, votes:0})
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote"/>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm