import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import {ActionsTypes, StateType, StoreType} from './redux/store';


type AppPropsStateType = {
  state: StateType
  store: StoreType
  dispatch: (action: ActionsTypes) => void
}
const App = (props: AppPropsStateType) => {
  return (
    <div className="app-wrapper">
      <Header/>
      <Navbar/>
      <div className="app-wrapper-content">
        <Route path="/dialogs"
               render={() =>
                 <Dialogs
                   store={props.store}
                 />}/>
        <Route path="/profile"
               render={() =>
                 <Profile
                   store={props.store}
                   dispatch={props.dispatch}
                 />}/>

        <Route path="/news" render={() => <News/>}/>
        <Route path="/music" render={() => <Music/>}/>
        <Route path="/settings" render={() => <Settings/>}/>
      </div>
    </div>
  )
}

export default App;
