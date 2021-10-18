import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  addPostAC,
  profileReducer,
  setUserProfile,
  updateNewPostText,
} from "./profile-reducer";
import {
  dialogsReducer,
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "./dialogs-reducer";
import {
  followSuccess,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  toggleFollowingProgress,
  unfollowSuccess,
  usersReducer,
} from "./users-reducer";
import authReducer, { setAuthUserData } from "./auth-reducer";

import thunkMiddleware from "redux-thunk";

export type ActionsTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostText>
  | ReturnType<typeof updateNewMessageBodyCreator>
  | ReturnType<typeof sendMessageCreator>
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setAuthUserData>
  | ReturnType<typeof toggleFollowingProgress>;

const reducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

type RootReduceType = typeof reducer;
export type AppStateType = ReturnType<typeof reducer>;

export let store = createStore(reducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
