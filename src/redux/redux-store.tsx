import {applyMiddleware, combineReducers, createStore} from 'redux';
import {
  addPostAC,
  profileReducer,
  setUserProfile,
  updateNewPostText
} from './profile-reducer';
import {
  dialogsReducer,
  sendMessageCreator,
  updateNewMessageBodyCreator
} from './dialogs-reducer';
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  toggleFollowingProgress,
  unfollow,
  usersReducer
} from './users-reducer';
import authReducer, {setAuthUserData} from './auth-reducer';

import thunkMiddleware from 'redux-thunk'

export type ActionsTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostText>
  | ReturnType<typeof updateNewMessageBodyCreator>
  | ReturnType<typeof sendMessageCreator>
  | ReturnType<typeof follow>
  | ReturnType<typeof unfollow>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setAuthUserData>
  | ReturnType<typeof toggleFollowingProgress>;

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer
});

type RootReduceType = typeof reducers;
export type AppStateType = ReturnType<typeof reducers>;

export let store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
