import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import {
  followSuccess,
  getUsers,
  setCurrentPage,
  toggleFollowingProgress,
  unfollowSuccess,
  UserType,
} from "../../redux/users-reducer";
import React from "react";
import { Users } from "./Users";
import { Preloader } from "../common/preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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

type ItemsResponseType = {
  items: Array<AxiosItemResponseType>;
  totalCount: number;
  error: string | null;
};

type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<string>;
};
type MapDispatchToPropsType = {
  follow: (userID: string) => void;
  unfollow: (userID: string) => void;
  // setUsers: (users: Array<UserType>) => void;
  setCurrentPage: (currentPage: number) => void;
  // setTotalUsersCount: (totalCount: number) => void;
  // toggleIsFetching: (isFetching: boolean) => void;
  toggleFollowingProgress: (isFetching: boolean, userID: string) => void;
  getUsers: any;
};

export type UsersPropsType = MapStatePropsType & MapDispatchToPropsType;

class UsersContainer extends React.Component<UsersPropsType> {
  // constructor(props:GetUsersResponseType) {
  //   super(props);
  // }
  componentDidMount() {
    // // Единственное правильное место где надо делать сайд эффект
    // * Используем вместо всего Санку. 66L.
    // this.props.toggleIsFetching(true); // Пошел запрос, запустился фетчинг
    //
    // usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
    //   .then((data) => {
    //     this.props.toggleIsFetching(false); // When we get answer, toggle is fetching
    //     this.props.setUsers(data.items);
    //     this.props.setTotalUsersCount(data.totalCount);
    //   });

    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    // * use Thunk
    // this.props.setCurrentPage(pageNumber);
    // this.props.toggleIsFetching(true);
    this.props.getUsers(pageNumber, this.props.pageSize);

    // usersAPI.getUsers(pageNumber, this.props.pageSize)
    //   .then((data) => {
    //
    //     this.props.toggleIsFetching(false);
    //     this.props.setUsers(data.items);
    //   });
  };

  render() {
    return (
      <>
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
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    {
      follow: followSuccess,
      unfollow: unfollowSuccess,
      setCurrentPage,
      toggleFollowingProgress,
      getUsers,
    }
  )
)(UsersContainer);
