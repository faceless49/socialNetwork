import { ActionsTypes } from "./redux-store";
import { authApi } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";

export type DataPropsType = {
  userID: string | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

export type AuthPropsType = {
  data: Array<DataPropsType>;
  isAuth: boolean;
};
// export type AuthPropsType = {
//   messages: Array<string>
//   data: Array<DataPropsType>
// }

let authInitialState = {
  userID: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (
  state: DataPropsType = authInitialState,
  action: ActionsTypes
): DataPropsType => {
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

export const setAuthUserData = (
  userId: string | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
) =>
  ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth },
  } as const);

export const getAuthUserData = () => (dispatch: any) => {
  authApi.me().then((response) => {
    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  });
};
export const login =
  (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    authApi.login(email, password, rememberMe).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
      } else {
        let message =
          response.data.messages.length > 0
            ? response.data.messages[0]
            : "Some error";
        dispatch(stopSubmit("login", { _error: message }));
      }
    });
  };

export const logout = () => (dispatch: any) => {
  authApi.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
