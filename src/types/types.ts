import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../redux/redux-store";
import { Action } from "redux";

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

//* Users

export type UserLocationType = {
  country: string;
  city: string;
};
export type PhotosType = {
  small: string;
  large: string;
};
export type UserType = {
  id: number;
  name: string;
  followed: boolean;
  status: string;
  photos: PhotosType;
  totalCount: number;
  error: null;
  location: UserLocationType;
};

// * Dialogs

export type MessageType = {
  id?: string;
  message: string;
};
export type DialogType = {
  id: string;
  name: string;
};

export type DialogPageType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
  newMessageBody: string;
};
