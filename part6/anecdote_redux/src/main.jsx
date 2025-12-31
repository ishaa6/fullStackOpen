import ReactDOM from 'react-dom/client';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notifReducer from './reducers/notifReducer'

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootReducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notifReducer
})
const store = configureStore({reducer: rootReducer})

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);

