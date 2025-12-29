import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await fetch(baseUrl)

    if (!response.ok) throw new Error('Failed to fetch notes')
    
    const data = await response.json()
    return data
}

const postData = async(data) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application-json'},
        body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to create new anecdote')
    return await response.json()
}

const updateVote = async(data) => {
    data = {
        ...data,
        votes: data.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${data.id}`, data)
    return await response.data
}

export default {getAll, postData, updateVote}