const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async() => {
    const response = await fetch(baseUrl)

    if (!response.ok) throw new Error('Failed to fetch notes')
    
    return await response.json()
}

export const createAnecdote = async(newAnecdote) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application-json'},
        body: JSON.stringify(newAnecdote)
    }

    const response = await fetch(baseUrl, options)
    if (!response.ok) throw new Error('Failed to create new anecdote')
    return await response.json()
}

export const updateVote = async(data) => {
    data = {
        ...data,
        votes: data.votes + 1
    }
    console.log(data)
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application-json'},
        body: JSON.stringify(data)
    }

    const response = await fetch(`${baseUrl}/${data.id}`, options)
    return await response.json()
}
