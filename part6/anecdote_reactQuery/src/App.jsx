import { useReducer } from 'react'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { setNotif } from './components/Notification'
import NotifContext from './providers/NotifContext'

const App = () => {

  const [notif, dispatchNotif] = useReducer(setNotif, '')

  return (
    <NotifContext.Provider value={{notif, dispatchNotif}}>
      <div>
        <Notification msg={notif}/>
        
        <h1>Anecdotes</h1>
        <AnecdoteList/>

        <h1>create new</h1>
        <AnecdoteForm />
      </div>
    </NotifContext.Provider>
  )
}

export default App
