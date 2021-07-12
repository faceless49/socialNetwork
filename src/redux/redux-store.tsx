import {combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {StoreType} from './store';

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer
})


let store:StoreType = createStore(reducers);

export default store
