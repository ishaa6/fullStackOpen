import ReactDOM from 'react-dom/client';
import counterReducer from './reducers/counterReducer';
import { createStore } from 'redux';

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <Button onClick={() => {
        store.dispatch({type: 'GOOD'})
      }} text="good" />
      <Button onClick={() => {
        store.dispatch({type: 'OK'})
      }} text="ok" />
      <Button onClick={() => {
        store.dispatch({type: 'BAD'})
      }} text="bad" />
      <Button onClick={() => {
        store.dispatch({type: 'RESET'})
      }} text="restore states"/>

      <div>
        <p>good {store.getState().good}</p>
        <p>ok {store.getState().ok}</p>
        <p>bad {store.getState().bad}</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const render = () => {
    root.render(<App/>)
}

render()
store.subscribe(render)