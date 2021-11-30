import { InferActionsType } from "./redux-store";
import { Dispatch } from "redux";
import { ThunkType, UserType } from "../types/types";
import { usersAPI } from "../api/users-api";
import { ResultCodesEnum } from "../api/api";

export type UsersActionTypes = InferActionsType<typeof actions>;

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
  action: UsersActionTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/USERS/FOLLOW":
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
    case "SN/USERS/UNFOLLOW":
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
    case "SN/USERS/SET_USERS":
      return { ...state, users: action.users };
    case "SN/USERS/SET_CURRENT_PAGE":
      return { ...state, currentPage: action.currentPage };
    case "SN/USERS/SET_TOTAL_USERS_COUNT":
      return { ...state, totalUsersCount: action.count };
    case "SN/USERS/TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS":
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

// * Action Creators
export const actions = {
  followSuccess: (userID: number) =>
    ({ type: "SN/USERS/FOLLOW", userID } as const),
  unfollowSuccess: (userID: number) =>
    ({ type: "SN/USERS/UNFOLLOW", userID } as const),
  setUsers: (users: Array<UserType>) =>
    ({ type: "SN/USERS/SET_USERS", users } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: "SN/USERS/SET_CURRENT_PAGE",
      currentPage,
    } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: "SN/USERS/SET_TOTAL_USERS_COUNT",
      count: totalUsersCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "SN/USERS/TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  toggleFollowingProgress: (isFetching: boolean, userID: number) =>
    ({
      type: "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userID,
    } as const),
};

// * Thunks

export const requestUsers =
  (page: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(true)); // Пошел запрос, запустился фетчинг
    dispatch(actions.setCurrentPage(page));
    const response = await usersAPI.getUsers(page, pageSize);
    dispatch(actions.toggleIsFetching(false)); // When we get answer, toggle is fetching
    dispatch(actions.setUsers(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));
  };

const _followUnfollowFlow = async (
  dispatch: Dispatch<UsersActionTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => UsersActionTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  const response = await apiMethod(userId);
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.followSuccess
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
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      actions.unfollowSuccess
    );

    // dispatch(toggleFollowingProgress(true, userId));
    // const response = await usersAPI.unfollow(userId);
    // if (response.data.resultCode === 0) {
    //   dispatch(unfollowSuccess(userId));
    // }
    // dispatch(toggleFollowingProgress(false, userId));
  };
