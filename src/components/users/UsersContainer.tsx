import {connect} from 'react-redux';
import Users from './UsersC';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {followAC, setUsersAC, unFollowAC, UserType} from '../../redux/users-reducer';


type MapStatePropsType = {
  users: Array<UserType>
}
type MapDispatchToProps = {
  follow: (userID: string) => void
  unfollow: (userID: string) => void
  setUsers: (users: Array<UserType>) => void
}

export type UsersPropsType = MapStatePropsType & MapDispatchToProps // TODO можно ли так типизировать компоненту USERS или надо расписывать все что есть в этих типах


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: state.usersPage.users
  }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
  return {
    follow: (userID: string) => {
      dispatch(followAC(userID))
    },
    unfollow: (userID: string) => {
      dispatch(unFollowAC(userID))
    },
    setUsers: (users: Array<UserType>) => {
      dispatch(setUsersAC(users))
    }
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
