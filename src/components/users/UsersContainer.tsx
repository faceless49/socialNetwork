import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { follow, requestUsers, unfollow } from "../../redux/users-reducer";
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
} from "../../redux/user-selectors";
import { UserType } from "../../types/types";

type PhotosItemResponseType = {
  small: string;
  large: string;
};

type AxiosItemResponseType = {
  name: string;
  id: number;
  uniqueUrlName: string;
  photos: Array<PhotosItemResponseType>;
  status: string;
  followed: boolean;
};

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
};
type MapDispatchToPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  // setCurrentPage: (currentPage: number) => void;
  // toggleFollowingProgress: (isFetching: boolean, userID: number) => void;
  getUsers: (page: number, pageSize: number) => void;
};

export type UsersPropsType = MapStatePropsType &
  MapDispatchToPropsType &
  OwnPropsType;

class UsersContainer extends React.Component<UsersPropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
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
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          // toggleFollowingProgress={this.props.toggleFollowingProgress} // В санках
          followingInProgress={this.props.followingInProgress}
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
