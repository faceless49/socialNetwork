import {RootStateType, StoreType} from './redux/store'
import store from './redux/redux-store'


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';


let rerenderEntireTree = (store: StoreType) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={store._state}
             dispatch={store.dispatch.bind(store)}
             store={store} /*40 lesson?*/
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


rerenderEntireTree(store);
store.subscribe = (() => {
  debugger
  let state = store
  rerenderEntireTree(state)
}) // У димыча в видео 37, 42


