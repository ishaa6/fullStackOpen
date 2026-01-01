import { useContext } from "react"
import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import NotifContext from "../providers/NotifContext"

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const {dispatchNotif} = useContext(NotifContext)

    const anecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
          const anecdotes = queryClient.getQueryData(['anecdotes'])
          queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
          dispatchNotif({payload: `created ${newAnecdote.anecdote}`})
          setTimeout(() => {
              dispatchNotif({payload:''})
           }, 5000)
        }
    })

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        if (content.length<5){
            dispatchNotif({payload: 'too short anecdote, must have length 5 or more'})
            setTimeout(() => {
                dispatchNotif({payload:''})
            }, 5000)
            return
        }  
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