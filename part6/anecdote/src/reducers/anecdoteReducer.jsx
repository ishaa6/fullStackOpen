import { createSlice} from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice ({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        updateVote(state, action){
            const anecdote = state.find(a => a.id === action.payload)
            anecdote.votes+=1 
        },

        createAnecdote(state, action){
            const data = {
                id: crypto.randomUUID(),
                anecdote: action.payload,
                votes: 0
            }
            state.push(data)
            anecdoteService.postData(data)
        },

        setAnecdotes(state, action){
            return action.payload
        }
    }
})

export const initializeAnecdotes = () => {
    return async(dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const voteAnecdote = (anecdote) => {
    return async(dispatch) => {
        await anecdoteService.updateVote(anecdote)
        dispatch(updateVote(anecdote.id))
    }
} 

export const {updateVote, createAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer