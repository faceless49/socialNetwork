import { v1 } from "uuid";
import { ActionsTypes } from "./redux-store";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"

// type UserLocationType = {
//   country: string
//   city: string
// }

export type PhotosType = {
  small: string;
  large: string;
};
export type UserType = {
  id: string;
  followed: boolean;
  name: string;
  status: string;
  photos: PhotosType;
  totalCount: number;
  error: null;
  // location: UserLocationType
};

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUserCount: 0,
  currentPage: 2,
  // users: [
  //   {
  //     id: v1(),
  //     followed: true,
  //     fullName: 'Dmitry K',
  //     status: 'I am looking for a job now',
  //     avatar: 'https://i.pinimg.com/originals/5a/2f/62/5a2f62cc03b9fefc06167a142bda9a61.jpg',
  //     location: {country: 'Belarus', city: 'Minsk'}
  //   },
  //   {
  //     id: v1(),
  //     followed: false,
  //     fullName: 'Sveta',
  //     status: 'Boss HTML',
  //     avatar: 'https://i.pinimg.com/originals/5a/2f/62/5a2f62cc03b9fefc06167a142bda9a61.jpg',
  //     location: {country: 'Ukraine', city: 'Kiev'}
  //   },
  //   {
  //     id: v1(),
  //     followed: false,
  //     fullName: 'Katya',
  //     status: 'Boss of money',
  //     avatar: 'https://i.pinimg.com/originals/5a/2f/62/5a2f62cc03b9fefc06167a142bda9a61.jpg',
  //     location: {country: 'Belarus', city: 'Minsk'}
  //   }
  // ] as Array<UserType>
};

export type InitialStateType = typeof initialState;

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
            return { ...u, followed: true };
          }
          return u;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    default:
      return state;
  }
};

export const followAC = (userID: string) => ({ type: FOLLOW, userID } as const);
export const unFollowAC = (userID: string) =>
  ({ type: UNFOLLOW, userID } as const);
export const setUsersAC = (users: Array<UserType>) =>
  ({ type: SET_USERS, users } as const);

export const setCurrentPageAC = (currentPage: number) => {
  ({type: SET_CURRENT_PAGE, currentPage} as const);
}
