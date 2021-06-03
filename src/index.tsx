import store, {StoreType} from './redux/state'


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';


let rerenderEntireTree = (store: StoreType) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={store.getState()}
             addPost={store.addPost}
             updateNewPostText={store.updateNewPostText}/>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}




rerenderEntireTree(store);
store.subscribe(rerenderEntireTree)


