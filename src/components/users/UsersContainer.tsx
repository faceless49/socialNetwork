import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unFollowAC,
  UserType,
} from '../../redux/users-reducer';
import React from 'react';
import axios from 'axios';
import {Users} from './Users';


type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
};
type MapDispatchToProps = {
  follow: (userID: string) => void;
  unfollow: (userID: string) => void;
  setUsers: (users: Array<UserType>) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (totalCount: number) => void;
};

export type UsersPropsType = MapStatePropsType & MapDispatchToProps;

class UsersContainer extends React.Component<UsersPropsType> {
  // constructor(props:GetUsersResponseType) {
  //   super(props);
  // }
  componentDidMount() {
    // Единственное правильное место где надо делать сайд эффект
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  }

  render() {


    return <Users totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  users={this.props.users}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}

    />
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  };
};

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
  return {
    follow: (userID) => {
      dispatch(followAC(userID));
    },
    unfollow: (userID) => {
      dispatch(unFollowAC(userID));
    },
    setUsers: (users: Array<UserType>) => {
      dispatch(setUsersAC(users));
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageAC(pageNumber));
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountAC(totalCount));
    }
  };
};

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps)
(UsersContainer);
