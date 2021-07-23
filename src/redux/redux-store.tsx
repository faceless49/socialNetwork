import { combineReducers, createStore } from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { usersReducer } from "./users-reducer";

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  users: usersReducer
});

type RootReduceType = typeof reducers;
export type AppStateType = ReturnType<typeof reducers>;

export let store = createStore(reducers);
