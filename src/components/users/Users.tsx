import React, { FC, useEffect } from "react";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User";
import { UserType } from "../../types/types";
import { UsersSearchForm } from "./UsersSearchForm";
import {
  FilterType,
  followTC,
  requestUsers,
  unfollowTC,
} from "../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPageSelect,
  getFollowingIsProgress,
  getPageSizeSelect,
  getTotalUsersCountSelect,
  getUsers,
  getUsersFilter,
} from "../../redux/user-selectors";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

type QueryParamsType = {
  term?: string;
  page?: string;
  friend?: string;
};

export const Users: FC = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCountSelect);
  const currentPage = useSelector(getCurrentPageSelect);
  const pageSize = useSelector(getPageSizeSelect);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingIsProgress);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(
      history.location.search.substr(1)
    ) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };

    switch (parsed.friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};

    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: "/users",
      // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const follow = (userID: number) => {
    dispatch(followTC(userID));
  };
  const unfollow = (userID: number) => {
    dispatch(unfollowTC(userID));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
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
