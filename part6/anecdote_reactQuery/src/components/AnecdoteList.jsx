import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateVote } from "../requests";
import { useContext } from "react";

import NotifContext from "../providers/NotifContext";

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const {dispatchNotif} = useContext(NotifContext)

  const voteMutation = useMutation({
        mutationFn: updateVote,
        onSuccess: (updatedAnecdote) => {
          let anecdotes = queryClient.getQueryData(['anecdotes'])
          anecdotes = anecdotes.map(anecdote => 
            anecdote.id === updatedAnecdote.id? updatedAnecdote : anecdote
          )
          queryClient.setQueryData(['anecdotes'], anecdotes)
        }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
  if (result.isError){
    return(
      <div>anecdote service not available due to problems in server</div>
    )
  }
  if (result.isLoading){
    return(
      <div>loading data...</div>
    )
  }
  const anecdotes = result.data

  return (
    <div>
     {anecdotes
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote => 
        <div key={anecdote.id}>
          {anecdote.anecdote} <br/>
          has {anecdote.votes} votes
          <button onClick = {() => {
            voteMutation.mutate(anecdote)
            dispatchNotif({payload:`anecdote '${anecdote.anecdote}' voted`})
            setTimeout(() => {
              dispatchNotif({payload:''})
            }, 5000)
          }}>
            vote
          </button>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList

