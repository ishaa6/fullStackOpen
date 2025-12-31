import { createSlice } from "@reduxjs/toolkit"

const notifSlice = createSlice ({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotif(state, action){
            return action.payload
        }
    }
})

export const setNotification = (msg, timer) => {
    return async(dispatch) => {
        dispatch(setNotif(msg))
        setTimeout(() => {
            dispatch(setNotif(""))
        }, timer*1000)
    }
}

export const {setNotif} = notifSlice.actions
export default notifSlice.reducer