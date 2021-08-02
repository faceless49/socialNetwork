import {combineReducers, createStore} from 'redux';
import {addPostAC, profileReducer, updateNewPostTextAC} from './profile-reducer';
import {dialogsReducer, sendMessageCreator, updateNewMessageBodyCreator} from './dialogs-reducer';
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  unfollow,
  usersReducer
} from './users-reducer';


export type ActionsTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostTextAC>
  | ReturnType<typeof updateNewMessageBodyCreator>
  | ReturnType<typeof sendMessageCreator>
  | ReturnType<typeof follow>
  | ReturnType<typeof unfollow>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof toggleIsFetching>

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
});

type RootReduceType = typeof reducers;
export type AppStateType = ReturnType<typeof reducers>;

export let store = createStore(reducers);
