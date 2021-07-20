import {combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer
})

type RootReduceType = typeof rootReducer
export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

