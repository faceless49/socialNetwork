import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import {
  FilterType,
  follow,
  requestUsers,
  unfollow,
} from "../../redux/users-reducer";
import React from "react";
import { Users } from "./Users";
import { Preloader } from "../common/preloader/Preloader";
import { compose } from "redux";
import {
  getCurrentPageSelect,
  getFollowingIsProgress,
  getIsFetchingSelect,
  getPageSizeSelect,
  getTotalUsersCountSelect,
  getUsers,
  getUsersFilter,
} from "../../redux/user-selectors";
import { UserType } from "../../types/types";

type OwnPropsType = {
  pageTitle: string;
};
type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
  filter: FilterType;
};
type MapDispatchToPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  getUsers: (page: number, pageSize: number, filter: FilterType) => void;
};

export type UsersPropsType = MapStatePropsType &
  MapDispatchToPropsType &
  OwnPropsType;

class UsersContainer extends React.Component<UsersPropsType> {
  componentDidMount() {
    this.props.getUsers(
      this.props.currentPage,
      this.props.pageSize,
      this.props.filter
    );
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize, filter } = this.props;

    this.props.getUsers(pageNumber, pageSize, filter);
  };

  onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props;
    this.props.getUsers(1, pageSize, filter);
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
          onFilterChanged={this.onFilterChanged}
          onPageChanged={this.onPageChanged}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSizeSelect(state),
    totalUsersCount: getTotalUsersCountSelect(state),
    currentPage: getCurrentPageSelect(state),
    isFetching: getIsFetchingSelect(state),
    followingInProgress: getFollowingIsProgress(state),
    filter: getUsersFilter(state),
  };
};

export default compose<React.ComponentType>(
  connect<
    MapStatePropsType,
    MapDispatchToPropsType,
    OwnPropsType,
    AppStateType
  >(mapStateToProps, {
    follow,
    unfollow,
    getUsers: requestUsers,
  })
)(UsersContainer);
