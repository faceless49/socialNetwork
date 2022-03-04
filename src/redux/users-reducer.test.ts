import { UserType } from "../types/types";
import { actions, usersReducer } from "./users-reducer";

type InitialStateType = typeof initialState;

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 2,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Dimych 0",
        followed: false,
        status: "status 0",
        location: {
          country: "",
          city: "",
        },
        totalCount: 0,
        error: null,
        photos: {
          small: "",
          large: "",
        },
      },
      {
        id: 1,
        name: "Dimych 1",
        followed: false,
        status: "status 1",
        location: {
          country: "",
          city: "",
        },
        totalCount: 0,
        error: null,
        photos: {
          small: "",
          large: "",
        },
      },
      {
        id: 2,
        name: "Dimych 3",
        followed: true,
        status: "status 3",
        location: {
          country: "",
          city: "",
        },
        totalCount: 0,
        error: null,
        photos: {
          small: "",
          large: "",
        },
      },
      {
        id: 3,
        name: "Dimych 4",
        followed: true,
        status: "status 4",
        location: {
          country: "",
          city: "",
        },
        totalCount: 0,
        error: null,
        photos: {
          small: "",
          large: "",
        },
      },
    ],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: false,
    followingInProgress: [],
  };
});

test("follow success", () => {
  const newState = usersReducer(state, actions.followSuccess(1));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});
test("unfollow success", () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3));

  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});
