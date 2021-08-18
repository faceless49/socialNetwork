import s from './Users.module.scss';
import userIcon from '../../assets/img/user.png';
import React from 'react';
import { UserType } from '../../redux/users-reducer';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

type ClearFuncUsersPropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  follow: (userID: string) => void;
  unfollow: (userID: string) => void;
  onPageChanged: (pageNumber: number) => void;
  toggleFollowingProgress: (isFetching: boolean) => void;
  followingInProgress: (isFetching: boolean) => void;
};

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
          return (
            <span
              className={props.currentPage === p ? s.selectedPage : ''}
              onClick={() => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
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
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.followingInProgress(true, u.id);
                    // Сначала делаем запрос на сервак чтобы подписаться
                    axios
                      .delete(
                        // Здесь данные о нашей логинизации передаются 2 объектом
                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                        {
                          withCredentials: true,
                          headers: {
                            'API-KEY': ''
                          }
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          // Подтверждение сервера
                          props.unfollow(u.id);
                        }
                        props.followingInProgress(false, u.id);
                      });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.followingInProgress(true, u.id);
                    // Сначала делаем запрос на сервак чтобы подписаться
                    axios
                      .post(
                        // Здесь данные о нашей логинизации передаются 3 объектом, а не 2 как в HeaderContainer
                        `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                        {},
                        {
                          withCredentials: true,
                          headers: { 'API-KEY': '' }
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.follow(u.id);
                        }
                        props.followingInProgress(false, u.id);
                      });
                  }}
                >
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
