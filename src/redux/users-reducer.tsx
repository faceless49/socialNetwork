import { InferActionsType } from "./redux-store";
import { Dispatch } from "redux";
import { BaseThunkType, UserType } from "../types/types";
import { usersAPI } from "../api/users-api";
import { ResultCodesEnum } from "../api/api";
import { ResponseType } from "../api/auth-api";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 2,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users id
  filter: {
    term: "",
    friend: null as null | boolean,
  },
};

export const usersReducer = (
  state = initialState,
  action: UsersActionsType
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
    case "SN/USERS/SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

// ! Action Creators
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
  setFilter: (filter: FilterType) =>
    ({
      type: "SN/USERS/SET_FILTER",
      payload: filter,
    } as const),
};

// * Thunks

export const requestUsers =
  (page: number, pageSize: number, filter: FilterType): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(true)); // Пошел запрос, запустился фетчинг
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));

    const response = await usersAPI.getUsers(
      page,
      pageSize,
      filter.term,
      filter.friend
    );
    dispatch(actions.toggleIsFetching(false)); // When we get answer, toggle is fetching
    dispatch(actions.setUsers(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));
  };

const _followUnfollowFlow = async (
  dispatch: Dispatch<UsersActionsType>,
  userId: number,
  apiMethod: (userId: number) => Promise<ResponseType>,
  actionCreator: (userId: number) => UsersActionsType
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  const response = await apiMethod(userId);
  if (response.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const followTC =
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

export const unfollowTC =
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

type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
export type UsersActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<UsersActionsType>;
