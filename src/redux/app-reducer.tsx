import { Dispatch } from "redux";
import {
  getAuthUserData,
  setAuthUserData,
  SetAuthUserDataType,
} from "./auth-reducer";

type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

type InitializedSuccessActionType = {
  type: "INITIALIZED_SUCCESS";
};

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccess = (): InitializedSuccessActionType =>
  ({
    type: "INITIALIZED_SUCCESS",
  } as const);

export const initializeApp = () => (dispatch: Dispatch<ActionsTypes>) => {
  dispatch(getAuthUserData());
  dispatch(initializedSuccess());
};

type ActionsTypes = InitializedSuccessActionType | SetAuthUserDataType;

export default appReducer;
