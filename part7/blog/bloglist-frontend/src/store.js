import {configureStore} from '@reduxjs/toolkit'
import notifReducer from './reducers/notifiReducer'

const store = configureStore({
    reducer: {
        notification: notifReducer
    }
})

export default store