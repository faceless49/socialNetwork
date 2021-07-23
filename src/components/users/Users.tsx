import React from 'react';
import {UsersPropsType} from './UsersContainer';
import s from './Users.module.scss'

export const Users = (props: UsersPropsType) => {
  return <div>{
    props.users.map(u => {
      return <div key={u.id}>
        <span>
          <div>
            <img src={u.avatar} alt="" className={s.avatar}/>
          </div>
          <div>
            {u.followed
              ? <button onClick={() => {
                props.follow(u.id)
              }}>Follow</button>
              : <button onClick={() => {
                props.unfollow(u.id)
              }}>Unfollow</button>}
          </div>
        </span>
        <span>
         <span>
           <div>{u.fullName}</div>
           <div>{u.status}</div>
         </span>
         <span>
            <div>{u.location.country}</div>
            <div>{u.location.city}</div>
         </span>
        </span>

      </div>
    })
  }</div>;
};
