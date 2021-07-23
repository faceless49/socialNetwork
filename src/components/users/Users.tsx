import React from 'react';
import {UsersPropsType} from './UsersContainer';
import s from './Users.module.scss'
import {v1} from 'uuid';

export const Users = (props: UsersPropsType) => {

  if (props.users.length === 0) {
    props.setUsers([
      {
        id: v1(),
        followed: true,
        fullName: 'Dmitry K',
        status: 'I am looking for a job now',
        avatar: 'https://i.pinimg.com/originals/5a/2f/62/5a2f62cc03b9fefc06167a142bda9a61.jpg',
        location: {country: 'Belarus', city: 'Minsk'}
      },
      {
        id: v1(),
        followed: false,
        fullName: 'Sveta',
        status: 'Boss HTML',
        avatar: 'https://i.pinimg.com/originals/5a/2f/62/5a2f62cc03b9fefc06167a142bda9a61.jpg',
        location: {country: 'Ukraine', city: 'Kiev'}
      },
      {
        id: v1(),
        followed: false,
        fullName: 'Katya',
        status: 'Boss of money',
        avatar: 'https://i.pinimg.com/originals/5a/2f/62/5a2f62cc03b9fefc06167a142bda9a61.jpg',
        location: {country: 'Belarus', city: 'Minsk'}
      }
    ])
  }
  // временная отрисовка

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
