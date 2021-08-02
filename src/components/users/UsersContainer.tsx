import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  unfollow,
  UserType,
} from '../../redux/users-reducer';
import React from 'react';
import axios, {AxiosResponse} from 'axios';
import {Users} from './Users';
import {Preloader} from '../common/preloader/Preloader';

type PhotosItemResponseType = {
  small: string
  large: string
}

type AxiosItemResponseType = {
  name: string
  id: number
  uniqueUrlName: string
  photos: Array<PhotosItemResponseType>,
  status: string
  followed: boolean
}

type ItemsResponseType = {
  items: Array<AxiosItemResponseType>
  totalCount: number
  error: string | null
}

type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean
};
type MapDispatchToProps = {
  follow: (userID: string) => void;
  unfollow: (userID: string) => void;
  setUsers: (users: Array<UserType>) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (totalCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void
};

export type UsersPropsType = MapStatePropsType & MapDispatchToProps;

class UsersContainer extends React.Component<UsersPropsType> {
  // constructor(props:GetUsersResponseType) {
  //   super(props);
  // }
  componentDidMount() {
    // Единственное правильное место где надо делать сайд эффект

    this.props.toggleIsFetching(true) // Пошел запрос, запустился фетчинг
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.toggleIsFetching(false) // When we get answer, toggle is fetching
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }


  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)
    this.props.toggleIsFetching(true)
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then((response) => { // fixme when we get Promise will be using ItemsResponseType
        this.props.toggleIsFetching(false)
        this.props.setUsers(response.data.items);
      });
  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             onPageChanged={this.onPageChanged}
             users={this.props.users}
             follow={this.props.follow}
             unfollow={this.props.unfollow}
      />
    </>
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage,
      isFetching: state.usersPage.isFetching,
    };
  }
;

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
;

// @ts-ignore
export default connect(
  mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
  })
(UsersContainer);
