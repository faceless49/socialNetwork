import { getAuthUserData } from "./auth-reducer";
import { InferActionsType } from "./redux-store";

export type InitialStateType = typeof initialState;
export type AppActionsType = InferActionsType<typeof actions>;

let initialState = { initialized: false, globalError: null };

const appReducer = (
  state = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializeApp = () => (dispatch: any) => {
  // * Type for THUNK Dispatch
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export const actions = {
  initializedSuccess: () =>
    ({
      type: "SN/APP/INITIALIZED_SUCCESS",
    } as const),
};

export default appReducer;
