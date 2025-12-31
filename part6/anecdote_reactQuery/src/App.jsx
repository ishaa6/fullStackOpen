import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  return (
    <div>
      <h1>Anecdotes</h1>
      <AnecdoteList/>

      <h1>create new</h1>
      <AnecdoteForm />
    </div>
  )
}

export default App
