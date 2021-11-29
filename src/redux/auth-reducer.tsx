import { ResultCodesEnum } from "../api/api";
import { stopSubmit } from "redux-form";
import { ThunkType } from "../types/types";
import { authApi } from "../api/auth-api";
import { InferActionsType } from "./redux-store";

let authInitialState = {
  userId: null as number | null, // В связи с тем, что мы создали тип с помощью typeof, ТС видит null и не воспринимает
  // его как число, нет четкого контроля
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export const authReducer = (
  state = authInitialState,
  action: ActionsType
): AuthInitialStateType => {
  switch (action.type) {
    case "SN/AUTH/SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SN/AUTH/SET_USER_DATA",
      payload: { userId, email, login, isAuth },
    } as const),
};

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

  if (response.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = response.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean): ThunkType =>
  async (dispatch) => {
    let response = await authApi.login(email, password, rememberMe);
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      let message =
        response.messages.length > 0 ? response.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authApi.logout();
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;

export type AuthInitialStateType = typeof authInitialState;
export type ActionsType = InferActionsType<typeof actions>;
