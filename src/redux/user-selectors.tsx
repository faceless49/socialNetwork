import { AppStateType } from "./redux-store";

export const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getPageSizeSelect = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export const getTotalUsersCountSelect = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};
export const getCurrentPageSelect = (state: AppStateType) => {
  return state.usersPage.currentPage;
};
export const getIsFetchingSelect = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
export const getFollowingIsProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};

// // * Example
// export const getUsers = createSelector(
//   getUsersSelector,
//   (users: Array<UserType>) => {
//     return users.filter((u) => u);
//   }
// );
