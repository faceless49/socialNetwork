import s from "./Users.module.scss";
import userIcon from "../../assets/img/user.png";
import React from "react";
import { UserType } from "../../redux/users-reducer";
import { NavLink } from "react-router-dom";
import { Paginator } from "../common/Paginator/Paginator";

type ClearFuncUsersPropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  onPageChanged: (pageNumber: number) => void;
  // toggleFollowingProgress: (isFetching: boolean, userID: string) => void;
  followingInProgress: Array<number>;
};
export const Users: React.FC<ClearFuncUsersPropsType> = ({
  users,
  pageSize,
  totalUsersCount,
  currentPage,
  follow,
  unfollow,
  onPageChanged,
  followingInProgress,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {/*<div className={s.pagination}>*/}
      {/*  {pages.map((p) => {*/}
      {/*    return (*/}
      {/*      <span*/}
      {/*        className={props.currentPage === p ? s.selectedPage : ""}*/}
      {/*        onClick={() => {*/}
      {/*          props.onPageChanged(p);*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        {p}*/}
      {/*      </span>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
      <Paginator
        totalUsersCount={totalUsersCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      {users.map((u: UserType) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
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
                  disabled={followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    follow(u.id);
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
              <div>{"u.location.country"}</div>
              <div>{"u.location.city"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
