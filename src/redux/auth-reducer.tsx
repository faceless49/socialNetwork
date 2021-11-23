import { authApi, ResultCodes } from "../api/api";
import { stopSubmit } from "redux-form";
import { ThunkType } from "../types/types";
import { InferActionsType } from "./redux-store";

const SET_USER_DATA = "SOCIAL-NETWORK/AUTH-REDUCER/SET_USER_DATA";

let authInitialState = {
  userId: null as number | null, // В связи с тем, что мы создали тип с помощью typeof, ТС видит null и не воспринимает
  // его как число, нет четкого контроля
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export type AuthInitialStateType = typeof authInitialState;
export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
) =>
  ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth },
  } as const);

export const authReducer = (
  state = authInitialState,
  action: ReturnType<typeof setAuthUserData>
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

// type SetAuthUserDataPayloadType = {
//   userId: number | null;
//   email: string | null;
//   login: string | null;
//   isAuth: boolean;
// };

// type SetAuthUserData = {
//   type: 'SOCIAL-NETWORK/AUTH-REDUCER/SET_USER_DATA';
//   payload: SetAuthUserDataPayloadType;
// };

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
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let response = await authApi.me();

  if (response.resultCode === ResultCodes.Success) {
    let { id, email, login } = response.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean): ThunkType =>
  async (dispatch: any) => {
    let response = await authApi.login(email, password, rememberMe);
    if (response.resultCode === ResultCodes.Success) {
      dispatch(getAuthUserData());
    } else {
      let message =
        response.messages.length > 0 ? response.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authApi.logout();
  if (response.data.resultCode === ResultCodes.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
