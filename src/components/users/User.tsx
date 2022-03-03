import s from "./Users.module.scss";
import userIcon from "../../assets/img/user.png";
import React from "react";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";

type ClearFuncUsersPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  followingInProgress: Array<number>;
  user: UserType;
};
export const User: React.FC<ClearFuncUsersPropsType> = ({
  follow,
  unfollow,
  followingInProgress,
  user,
}) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small != null ? user.photos.small : userIcon}
              alt=""
              className={s.avatar}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{user.location?.country}</div>
          <div>{user.location?.city}</div>
        </span>
      </span>
    </div>
  );
};
