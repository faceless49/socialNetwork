import { actions, follow, unfollow } from "./users-reducer";
import { usersAPI } from "../api/users-api";
import { ResponseType } from "../api/auth-api";
import { ResultCodesEnum } from "../api/api";

jest.mock("../api/users-api");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  usersAPIMock.follow.mockClear();
  usersAPIMock.unfollow.mockClear();
});

const result: ResponseType = {
  data: {},
  messages: [],
  resultCode: ResultCodesEnum.Success,
};

test("follow thunk should be success", async () => {
  usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
  const thunk = follow(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
});
test("unfollow thunk should be success", async () => {
  usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
  const thunk = unfollow(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
});
