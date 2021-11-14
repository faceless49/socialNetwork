import { v1 } from "uuid";
import { ActionsTypes } from "./redux-store";
import { profileAPI, usersAPI } from "../api/api";
import { Dispatch } from "redux";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

type PhotosType = {
  small: string | null;
  large: string | null;
};
type ContactsType = {
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
};

export type InitialStateType = typeof initialState;

export const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
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
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    case "SAVE_PHOTO_SUCCESS":
      return { ...state, profile: { ...state.profile, photos: action.photos } };

    default:
      return state;
  }
};

export const addPostAC = (newPostText: string) =>
  ({ type: ADD_POST, newPostText } as const);

export const setStatus = (status: string) => {
  return {
    type: SET_STATUS,
    status,
  } as const;
};
export const setUserProfile = (profile: ProfileType) =>
  ({ type: SET_USER_PROFILE, profile } as const);

export const deleteMessage = (postId: string) =>
  ({ type: "DELETE_POST", postId } as const);

export const savePhotoSuccess = (photos: PhotosType) =>
  ({ type: "SAVE_PHOTO_SUCCESS", photos } as const);

//* Thunks
export const getUserProfile =
  (userId: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
  };

export const getStatus =
  (userId: number) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
  };

export const updateStatus =
  (status: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };

export const savePhoto =
  (file: any) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos));
    }
  };
