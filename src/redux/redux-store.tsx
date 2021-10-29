import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  addPostAC,
  profileReducer,
  setStatus,
  setUserProfile,
} from "./profile-reducer";
import { dialogsReducer, sendMessageCreator } from "./dialogs-reducer";
import {
  followSuccess,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleFollowingProgress,
  toggleIsFetching,
  unfollowSuccess,
  usersReducer,
} from "./users-reducer";
import authReducer, {
  setAuthUserData,
  SetAuthUserDataType,
} from "./auth-reducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";

export type ActionsTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof sendMessageCreator>
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof toggleFollowingProgress>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof setAuthUserData>
  | SetAuthUserDataType;

const reducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
});

type RootReduceType = typeof reducer;
export type AppStateType = ReturnType<RootReduceType>;

export let store = createStore(reducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
