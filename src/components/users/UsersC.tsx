import React from 'react';
import s from './Users.module.scss'
import axios from 'axios';
import userIcon from './../../assets/img/user.png'
import {UsersPropsType} from './UsersContainer';
import {UserType} from '../../redux/users-reducer';


type GetUsersResponseType = {
  items: Array<UserType>
  totalCount: number
  error: null
}


class Users extends React.Component {

  constructor(props: UsersPropsType) {
    super(props);

  }

  componentDidMount() {
    axios.get('https://social-network.samuraijs.com/api/1.0/users').then((response) => { // * TODO Надо ли здесь типизировать респонс и как?
      this.props.setUsers(response.data.items)
    })
  }

  render() {
    return <div>
      <button onClick={this.getUsers}>Get users</button>
      {
        this.props.users.map(u => <div key={u.id}>
        <span>
          <div>
            <img src={u.photos.small != null ? u.photos.small : userIcon} alt="" className={s.avatar}/>
          </div>
          <div>
            {u.followed
              ? <button onClick={() => {
                this.props.unfollow(u.id)
              }}>Unfollow</button>
              : <button onClick={() => {
                this.props.follow(u.id)
              }}>Follow</button>}
          </div>
        </span>
          <span>
         <span>
           <div>{u.name}</div>
           <div>{u.status}</div>
         </span>
         <span>
            <div>{'u.location.country'}</div>
            <div>{'u.location.city'}</div>
         </span>
        </span>

        </div>)}
    </div>;
  }
}

export default Users
