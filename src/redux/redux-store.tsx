import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { ProfileActionsType, profileReducer } from "./profile-reducer";
import { DialogsActionsType, dialogsReducer } from "./dialogs-reducer";
import { UsersActionTypes, usersReducer } from "./users-reducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";
import authReducer, { AuthActionsType } from "./auth-reducer";
import appReducer, { AppActionsType } from "./app-reducer";

export type RootActionsTypes =
  | AppActionsType
  | AuthActionsType
  | DialogsActionsType
  | ProfileActionsType
  | UsersActionTypes;

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
