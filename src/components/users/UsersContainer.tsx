import { connect } from "react-redux";
import UsersC from "./UsersC";
import { AppStateType } from "../../redux/redux-store";
import { Dispatch } from "redux";
import {
  followAC,
  setUsersAC,
  unFollowAC,
  UserType,
  setCurrentPageAC,
} from "../../redux/users-reducer";

type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUserCount: number;
  currentPage: number;
};
type MapDispatchToProps = {
  follow: (userID: string) => void;
  unfollow: (userID: string) => void;
  setUsers: (users: Array<UserType>) => void;
  setCurrentPage: (currentPage: number) => void;
};

export type UsersPropsType = MapStatePropsType & MapDispatchToProps;

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUserCount: state.usersPage.totalUserCount,
    currentPage: state.usersPage.currentPage,
  };
};

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
  return {
    follow: (userID: string) => {
      dispatch(followAC(userID));
    },
    unfollow: (userID: string) => {
      dispatch(unFollowAC(userID));
    },
    setUsers: (users: Array<UserType>) => {
      dispatch(setUsersAC(users));
    },
    setCurrentPage: (pageNumber: number) => {
      dispatch(setCurrentPageAC(pageNumber));
    },
    setTotalUsersCount(totalCount) => {
      dispatch(setTotalUsersCountAC(totalCount));
    }
  };
};

// @ts-ignore
export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersC);
