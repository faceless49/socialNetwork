import { ActionsTypes } from './store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

type UserType = {
  id: string;
  followed: boolean;
  fullName: string;
  status: string;
  avatar: string;
  location: { country: string; city: string };
};

let usersInitialState = {
  users: [
    {
      id: 1,
      followed: true,
      fullName: 'Dmitry K',
      status: 'I am looking for a job now',
      avatar: 'url()',
      location: { country: 'Belarus', city: 'Minsk' }
    },
    {
      id: 2,
      followed: false,
      fullName: 'Sveta',
      status: 'Boss HTML',
      avatar: 'url()',
      location: { country: 'Ukrain', city: 'Kiev' }
    },
    {
      id: 3,
      followed: false,
      fullName: 'Katya',
      status: 'Boss of money',
      avatar: 'url()',
      location: { country: 'Belarus', city: 'Minsk' }
    }
  ]
};

export type UsersInitialStateType = typeof usersInitialState;

export const usersReducer = (
  state: UsersInitialStateType = usersInitialState,
  action: ActionsTypes
): UsersInitialStateType => {
  switch (action.type) {
    case FOLLOW:
      // Аналогичная запись мапу
      // let stateCopy = {...state, users: [...state.users]}
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: true };
          }
          return u;
        })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: false };
          }
          return u;
        })
      };
    default:
      return state;
  }
};

export const followAC = (userID: string) => ({ type: FOLLOW, userID } as const);
export const unFollowAC = (userID: string) =>
  ({ type: UNFOLLOW, userID } as const);

export const setUsersAC = (users) => ({ type: SET_USERS, users });
