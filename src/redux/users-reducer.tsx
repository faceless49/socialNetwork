import { ActionsTypes } from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

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
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 2,
  isFetching: false,
  followingInProgress: []
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
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return { ...state, 
        followingInProgress: action.isFetching 
        ? [...state.followingInProgress, action.userID] 
        : state.followingInProgress.filter(id => id != action.userID) 
      }
    }
    default:
      return state;
  }
};

export const follow = (userID: string) => ({ type: FOLLOW, userID } as const);
export const unfollow = (userID: string) =>
  ({ type: UNFOLLOW, userID } as const);
export const setUsers = (users: Array<UserType>) =>
  ({ type: SET_USERS, users } as const);
export const setCurrentPage = (currentPage: number) =>
  ({ type: SET_CURRENT_PAGE, currentPage } as const);
export const setTotalUsersCount = (totalUsersCount: number) =>
  ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
  } as const);
export const toggleIsFetching = (isFetching: boolean) =>
  ({
    type: TOGGLE_IS_FETCHING,
    isFetching
  } as const);
export const toggleFollowingProgress = (isFetching: boolean, userID: string) =>
  ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching
  } as const);
