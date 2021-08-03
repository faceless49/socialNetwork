import s from './Users.module.scss';
import userIcon from '../../assets/img/user.png';
import React from 'react';
import {UserType} from '../../redux/users-reducer';
import {NavLink} from 'react-router-dom';

type ClearFuncUsersPropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  follow: (userID: string) => void;
  unfollow: (userID: string) => void;
  onPageChanged: (pageNumber: number) => void
}

export const Users = (props: ClearFuncUsersPropsType) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={s.pagination}>
        {pages.map((p) => {
          return <span className={props.currentPage === p ? s.selectedPage : ''} onClick={() => {
            props.onPageChanged(p)
          }}>{p}</span>;
        })}
      </div>
      {props.users.map((u: any) => (
        <div key={u.id}>
            <span>
              <div>
                <NavLink to={'/profile/' + u.id}>
                <img
                  src={u.photos.small != null ? u.photos.small : userIcon}
                  alt=""
                  className={s.avatar}
                />
                </NavLink>

              </div>
              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      props.unfollow(u.id);
                    }}>
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      props.follow(u.id)
                    }}>
                    Follow
                  </button>
                )}
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
        </div>
      ))}
    </div>
  );
};
