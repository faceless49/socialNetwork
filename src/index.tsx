import store, {RootStateType, StoreType} from './redux/state'


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
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


rerenderEntireTree(store);
store.subscribe(rerenderEntireTree) // У димыча в видео 37


