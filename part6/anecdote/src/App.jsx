import AnecdoteList from "./components/anecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {

  return (
    <div>
      <Notification/>
      <h1>Anecdotes</h1>
      <Filter/>
      <AnecdoteList />

      <h1>create new</h1>
      <AnecdoteForm />
    </div>
  )
}

export default App