import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const toggleComplete = () => {
  return {
    type: 'TOGGLE_COMPLETE'
  };
};

// My very first original reducer!
const completer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_COMPLETE':
      return (state = !state);
    default:
      return state;
  }
};

const store = createStore(
  completer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => console.log(store.getState()));
store.dispatch(toggleComplete());
store.dispatch(toggleComplete());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
