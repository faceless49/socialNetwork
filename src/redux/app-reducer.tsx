import { getAuthUserData, setAuthUserData } from "./auth-reducer";

type InitialStateType = { initialized: boolean };

let initialState: InitialStateType = { initialized: false };

type InitializedSuccessActionType = { type: "INITIALIZED_SUCCESS" };

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

export const initializeApp = () => (dispatch: any) => {
  // * Type for THUNK Dispatch
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

type ActionsTypes =
  | InitializedSuccessActionType
  | ReturnType<typeof setAuthUserData>;

export default appReducer;
