import { ActionsTypes } from "./redux-store";
import { authApi } from "../api/api";
import { stopSubmit } from "redux-form";
import { Dispatch } from "redux";

const SET_USER_DATA = "auth/SET_USER_DATA";

let authInitialState = {
  userId: null as number | null, // В связи с тем, что мы создали тип с помощью typeof, ТС видит null и не воспринимает
  // его как число, нет четкого контроля
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export type AuthInitialStateType = typeof authInitialState;

const authReducer = (
  state = authInitialState,
  action: ActionsTypes
): AuthInitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

type SetAuthUserDataPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserData = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataPayloadType;
};
export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserData =>
  ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth },
  } as const);

// * Promise with then
// export const getAuthUserData = () => (dispatch: Dispatch<ActionsTypes>) => {
//   authApi.me().then((response) => {
//     if (response.data.resultCode === 0) {
//       let { id, email, login } = response.data.data;
//       dispatch(setAuthUserData(id, email, login, true));
//     }
//   });
// };

// * Async await
export const getAuthUserData =
  () => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await authApi.me();

    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  };

export const login =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: any) => {
    let response = await authApi.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const logout = () => async (dispatch: Dispatch<ActionsTypes>) => {
  let response = await authApi.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
