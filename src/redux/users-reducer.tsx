import { ActionsTypes, AppStateType } from "./redux-store";
import { usersAPI } from "../api/api";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

const FOLLOW = "USERS/FOLLOW";
const UNFOLLOW = "USERS/UNFOLLOW";
const SET_USERS = "USERS/SET_USERS";
const SET_CURRENT_PAGE = "USERS/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "USERS/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "USERS/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "USERS/TOGGLE_IS_FOLLOWING_PROGRESS";

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
  followingInProgress: [] as Array<number>, // array of users id
};

export type InitialStateType = typeof initialState;

export const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: true };
          }
          return u;
        }),
        // users: updateObjectInArray(state.users, action.userID, "id", {
        //   followed: true,
        // }),
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
        // users: updateObjectInArray(state.users, action.userID, "id", {
        //   followed: false,
        // }),
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

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;
export const requestUsers =
  (page: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(toggleIsFetching(true)); // Пошел запрос, запустился фетчинг
    dispatch(setCurrentPage(page));
    const response = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false)); // When we get answer, toggle is fetching
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
  };

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (
    userId: number
  ) => ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess>
) => {
  dispatch(toggleFollowingProgress(true, userId));

  const response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followSuccess
    );

    // dispatch(toggleFollowingProgress(true, userId));
    // const response = await usersAPI.follow(userId);
    // if (response.data.resultCode === 0) {
    //   dispatch(followSuccess(userId));
    // }
    // dispatch(toggleFollowingProgress(false, userId));
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      unfollowSuccess
    );

    // dispatch(toggleFollowingProgress(true, userId));
    // const response = await usersAPI.unfollow(userId);
    // if (response.data.resultCode === 0) {
    //   dispatch(unfollowSuccess(userId));
    // }
    // dispatch(toggleFollowingProgress(false, userId));
  };
