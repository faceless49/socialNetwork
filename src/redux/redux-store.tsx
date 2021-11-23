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
import { actions, usersReducer } from "./users-reducer";
import authReducer, { setAuthUserData } from "./auth-reducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reducer";

export type RootActionsTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof deleteMessage>
  | ReturnType<typeof sendMessage>
  | ReturnType<typeof actions.followSuccess>
  | ReturnType<typeof actions.unfollowSuccess>
  | ReturnType<typeof actions.setUsers>
  | ReturnType<typeof actions.setTotalUsersCount>
  | ReturnType<typeof actions.setCurrentPage>
  | ReturnType<typeof actions.toggleIsFetching>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof actions.toggleFollowingProgress>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof setAuthUserData>
  | ReturnType<typeof savePhotoSuccess>;

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsType<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

// @ts-ignore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

// export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
