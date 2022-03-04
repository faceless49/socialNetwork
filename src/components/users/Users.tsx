import React, { FC } from "react";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User";
import { UserType } from "../../types/types";
import { UsersSearchForm } from "./UsersSearchForm";

type ClearFuncUsersPropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  onPageChanged: (pageNumber: number) => void;
  followingInProgress: Array<number>;
};
export const Users: FC<ClearFuncUsersPropsType> = ({
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
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <UsersSearchForm />
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
