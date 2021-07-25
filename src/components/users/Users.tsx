import React from 'react';
import {UsersPropsType} from './UsersContainer';
import s from './Users.module.scss'
import axios from 'axios';
import {UserType} from '../../redux/users-reducer';
import userIcon from './../../assets/img/user.png'

type GetUsersResponseType = {
  items: Array<UserType>
  totalCount: number
  error: null
}


export let Users = (props: UsersPropsType) => {
  console.log('Render Users')

  let getUsers = () => {
    if (props.users.length === 0) {

      axios.get('https://social-network.samuraijs.com/api/1.0/users').then((response) => { // * TODO Надо ли здесь типизировать респонс и как?
        props.setUsers(response.data.items)

      })


    }
  }


  // временная отрисовка

  return <div>
    <button onClick={getUsers}>Get users</button>
    {
      props.users.map(u => <div key={u.id}>
        <span>
          <div>
            <img src={u.photos.small != null ? u.photos.small : userIcon } alt="" className={s.avatar}/>
          </div>
          <div>
            {u.followed
              ? <button onClick={() => {
                props.unfollow(u.id)
              }}>Unfollow</button>
              : <button onClick={() => {
                props.follow(u.id)
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
};
