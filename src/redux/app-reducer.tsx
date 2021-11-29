import { getAuthUserData } from "./auth-reducer";
import { InferActionsType } from "./redux-store";

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;

let initialState = { initialized: false };

const appReducer = (
  state = initialState,
  action: ActionsType
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
  initializedSuccess: () => ({
    type: "SN/APP/INITIALIZED_SUCCESS",
  }),
};

export default appReducer;
