import {v1} from 'uuid';
import {ActionsTypes} from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

type UserLocationType = {
  country: string
  city: string
}


export type UserType = {
  id: string;
  followed: boolean;
  fullName: string;
  status: string;
  avatar: string;
  location: UserLocationType
};

let initialState = {
  users: [
    // {
    //   id: v1(),
    //   followed: true,
    //   fullName: 'Dmitry K',
    //   status: 'I am looking for a job now',
    //   avatar: 'https://i.pinimg.com/originals/5a/2f/62/5a2f62cc03b9fefc06167a142bda9a61.jpg',
    //   location: {country: 'Belarus', city: 'Minsk'}
    // },
    // {
    //   id: v1(),
    //   followed: false,
    //   fullName: 'Sveta',
    //   status: 'Boss HTML',
    //   avatar: 'https://i.pinimg.com/originals/5a/2f/62/5a2f62cc03b9fefc06167a142bda9a61.jpg',
    //   location: {country: 'Ukraine', city: 'Kiev'}
    // },
    // {
    //   id: v1(),
    //   followed: false,
    //   fullName: 'Katya',
    //   status: 'Boss of money',
    //   avatar: 'https://i.pinimg.com/originals/5a/2f/62/5a2f62cc03b9fefc06167a142bda9a61.jpg',
    //   location: {country: 'Belarus', city: 'Minsk'}
    // }
  ] as Array<UserType>
};

export type InitialStateType = typeof initialState; // TODO Как все-таки писать типы и инишиалы usersInitialStateType or InitialStateType


export const usersReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      // Аналогичная запись мапу
      // let stateCopy = {...state, users: [...state.users]}
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return {...u, followed: true};
          }
          return u;
        })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return {...u, followed: false};
          }
          return u;
        })
      };
    case SET_USERS: {
      return {...state, users: [...state.users, ...action.users]}
    }
    default:
      return state;
  }
};

export const followAC = (userID: string) => ({type: FOLLOW, userID} as const);
export const unFollowAC = (userID: string) => ({type: UNFOLLOW, userID} as const);
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const);
