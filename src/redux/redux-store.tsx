import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {
  addPostAC,
  deleteMessage,
  profileReducer,
  savePhotoSuccess,
  setStatus,
  setUserProfile,
} from "./profile-reducer";
import { dialogsReducer, sendMessage } from "./dialogs-reducer";
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
import authReducer, { setAuthUserData } from "./auth-reducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reducer";

export type ActionsTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof deleteMessage>
  | ReturnType<typeof sendMessage>
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
  | ReturnType<typeof savePhotoSuccess>;

const reducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReduceType = typeof reducer;
export type AppStateType = ReturnType<RootReduceType>;

// @ts-ignore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

// export let store = createStore(reducer, applyMiddleware(thunkMiddleware));
