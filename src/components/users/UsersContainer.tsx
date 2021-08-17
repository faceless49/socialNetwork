import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  unfollow,
  UserType,
  toggleFollowingProgress
} from '../../redux/users-reducer';
import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Users } from './Users';
import { Preloader } from '../common/preloader/Preloader';
import { usersAPI } from './../../api/api';

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
  followingInProgress: boolean;
};
type MapDispatchToProps = {
  follow: (userID: string) => void;
  unfollow: (userID: string) => void;
  setUsers: (users: Array<UserType>) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (totalCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void;
  getUsers: (currentPage: number, pageSize: number) => void;
  followingInProgress: (isFetching: boolean) => void;
};

export type UsersPropsType = MapStatePropsType & MapDispatchToProps;

class UsersContainer extends React.Component<UsersPropsType> {
  // constructor(props:GetUsersResponseType) {
  //   super(props);
  // }
  componentDidMount() {
    // Единственное правильное место где надо делать сайд эффект

    this.props.toggleIsFetching(true); // Пошел запрос, запустился фетчинг
    usersAPI
      .getUsers(this.props.currentPage, this.props.pageSize)
      .then((data) => {
        this.props.toggleIsFetching(false); // When we get answer, toggle is fetching
        this.props.setUsers(data.items);
        this.props.setTotalUsersCount(data.totalCount);
      });
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);

    usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
      // fixme when we get Promise will be using ItemsResponseType
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
      this.props.setTotalUsersCount(data.totalCount);
    });
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
    followingInProgress: state.usersPage.followingInProgress
  };
};
// let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
//     return {
//       follow: (userID) => {
//         dispatch(followAC(userID));
//       },
//       unfollow: (userID) => {
//         dispatch(unFollowAC(userID));
//       },
//       setUsers: (users: Array<UserType>) => {
//         dispatch(setUsersAC(users));
//       },
//       setCurrentPage: (pageNumber) => {
//         dispatch(setCurrentPageAC(pageNumber));
//       },
//       setTotalUsersCount: (totalCount) => {
//         dispatch(setTotalUsersCountAC(totalCount));
//       },
//       toggleIsFetching: (isFetching) => {
//         dispatch(toggleIsFetchingAC(isFetching));
//       }
//     };
//   }
// ;

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleFollowingProgress
})(UsersContainer);
