import { v1 } from "uuid";
import {
  AppStateType,
  InferActionsType,
  RootActionsTypes,
} from "./redux-store";
import { Dispatch } from "redux";
import { usersAPI } from "../api/users-api";
import { profileAPI } from "../api/profile-api";
import { stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api";
import { ThunkType } from "../types/types";

type PhotosType = {
  small: string | null;
  large: string | null;
};
export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe: string;
  status: string;
};
export type PostType = {
  id: string;
  message: string;
  likesCount: number;
};

let initialState = {
  posts: [
    { id: v1(), message: "Hi, how are you?", likesCount: 12 },
    { id: v1(), message: "It's my first post", likesCount: 11 },
    { id: v1(), message: "Blala", likesCount: 11 },
    { id: v1(), message: "Dada", likesCount: 15 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
};

export type InitialStateType = typeof initialState;

export const profileReducer = (
  state = initialState,
  action: ProfileActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD-POST": {
      let newPost: PostType = {
        id: v1(),
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case "SN/PROFILE/SET_USER_PROFILE":
      return { ...state, profile: action.profile };
    case "SN/PROFILE/SET_STATUS":
      return { ...state, status: action.status };
    case "SN/PROFILE/DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };

    default:
      return state;
  }
};

export type ProfileActionsType = InferActionsType<typeof actions>;
export const actions = {
  addPostAC: (newPostText: string) =>
    ({ type: "SN/PROFILE/ADD-POST", newPostText } as const),

  setStatus: (status: string) => {
    return {
      type: "SN/PROFILE/SET_STATUS",
      status,
    } as const;
  },
  setUserProfile: (profile: ProfileType) =>
    ({ type: "SN/PROFILE/SET_USER_PROFILE", profile } as const),

  deleteMessage: (postId: string) =>
    ({ type: "SN/PROFILE/DELETE_POST", postId } as const),

  savePhotoSuccess: (photos: PhotosType) =>
    ({ type: "SN/PROFILE/SAVE_PHOTO_SUCCESS", photos } as const),
};

//* Thunks
export const getUserProfile =
  (userId: number) => async (dispatch: Dispatch<RootActionsTypes>) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
  };

export const getStatus =
  (userId: number) => async (dispatch: Dispatch<RootActionsTypes>) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response));
  };

export const updateStatus =
  (status: string) => async (dispatch: Dispatch<RootActionsTypes>) => {
    let response = await profileAPI.updateStatus(status);
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setStatus(status));
    }
  };

export const savePhoto =
  (file: any) => async (dispatch: Dispatch<RootActionsTypes>) => {
    let response = await profileAPI.savePhoto(file);
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.savePhotoSuccess(response.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState: () => AppStateType) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.resultCode === ResultCodesEnum.Success) {
      if (userId != null) {
        await dispatch(getUserProfile(userId));
      } else {
        throw new Error('userId can"t be null');
      }
    } else {
      dispatch(stopSubmit("edit-profile", { _error: response.messages[0] }));
      return Promise.reject(response.messages[0]);
    }
  };
