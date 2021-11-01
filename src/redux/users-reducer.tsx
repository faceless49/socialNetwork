import { ActionsTypes } from "./redux-store";
import { usersAPI } from "../api/api";
import { Dispatch } from "redux";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

type UserLocationType = {
  country: string;
  city: string;
};

export type PhotosType = {
  small: string;
  large: string;
};
export type UserType = {
  id: number;
  name: string;
  followed: boolean;
  status: string;
  photos: PhotosType;
  totalCount: number;
  error: null;
  location: UserLocationType;
};

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 2,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

export type InitialStateType = typeof initialState;

export const usersReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      debugger;
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
      debugger;

      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: false };
          }
          return u;
        }),
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
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter((id) => id !== action.userID),
      };
    default:
      return state;
  }
};

export const followSuccess = (userID: number) =>
  ({ type: FOLLOW, userID } as const);
export const unfollowSuccess = (userID: number) =>
  ({ type: UNFOLLOW, userID } as const);
export const setUsers = (users: Array<UserType>) =>
  ({ type: SET_USERS, users } as const);
export const setCurrentPage = (currentPage: number) =>
  ({ type: SET_CURRENT_PAGE, currentPage } as const);
export const setTotalUsersCount = (totalUsersCount: number) =>
  ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  } as const);
export const toggleIsFetching = (isFetching: boolean) =>
  ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
  } as const);
export const toggleFollowingProgress = (isFetching: boolean, userID: number) =>
  ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userID,
  } as const);

// * Thunks
export const requestUsers = (page: number, pageSize: number) => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(toggleIsFetching(true)); // Пошел запрос, запустился фетчинг
    dispatch(setCurrentPage(page));
    usersAPI.getUsers(page, pageSize).then((data) => {
      dispatch(toggleIsFetching(false)); // When we get answer, toggle is fetching
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  };
};

export const follow = (userId: number) => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(toggleFollowingProgress(true, userId));
    // Сначала делаем запрос на сервак чтобы подписаться
    usersAPI.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        // Подтверждение сервера
        dispatch(followSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};

export const unfollow = (userId: number) => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(toggleFollowingProgress(true, userId));
    // Сначала делаем запрос на сервак чтобы подписаться
    usersAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};
