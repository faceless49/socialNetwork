import {combineReducers, createStore} from 'redux';
import {addPostAC, profileReducer, updateNewPostTextAC} from './profile-reducer';
import {dialogsReducer, sendMessageCreator, updateNewMessageBodyCreator} from './dialogs-reducer';
import {followAC, setUsersAC, unFollowAC, usersReducer} from './users-reducer';


export type ActionsTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostTextAC>
  | ReturnType<typeof updateNewMessageBodyCreator>
  | ReturnType<typeof sendMessageCreator>
  | ReturnType<typeof followAC>
  | ReturnType<typeof unFollowAC>
  | ReturnType<typeof setUsersAC>

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer
});

type RootReduceType = typeof reducers;
export type AppStateType = ReturnType<typeof reducers>;

export let store = createStore(reducers);
