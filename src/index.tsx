import {StateType, StoreType} from './redux/store'
import store from './redux/redux-store'


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';


let rerenderEntireTree = (state: StateType) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={state}
             dispatch={store.dispatch.bind(store)}
             store={store} /*40 lesson?*/
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


rerenderEntireTree(store.getState());
store.subscribe = (() => {
  let state = store.getState()
  rerenderEntireTree(state)
}) // У димыча в видео 37, 42


