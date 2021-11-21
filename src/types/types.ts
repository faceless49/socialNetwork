import { ThunkAction } from "redux-thunk";
import { ActionsTypes, AppStateType } from "../redux/redux-store";

export type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;
