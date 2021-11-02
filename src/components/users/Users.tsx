import s from "./Users.module.scss";
import userIcon from "../../assets/img/user.png";
import React from "react";
import { UserType } from "../../redux/users-reducer";
import { NavLink } from "react-router-dom";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User";

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
      <Paginator
        totalUsersCount={totalUsersCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      {users.map((u: UserType) => (
        <User
          key={u.id}
          user={u}
          followingInProgress={followingInProgress}
          follow={follow}
          unfollow={unfollow}
        />
      ))}
    </div>
  );
};
