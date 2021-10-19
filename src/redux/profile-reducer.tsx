import { v1 } from "uuid";
import { ActionsTypes } from "./redux-store";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

export type ProfilePageType = {
  posts: Array<PostType>;
  newPostText: string;
  profile: null;
};
export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: any;
  photos: any;
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
  updateNewPostText: "it-kamasutra" as string,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost: PostType = {
        id: v1(),
        message: state.updateNewPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        updateNewPostText: "",
      };
    }
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        updateNewPostText: action.text,
      };
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export const addPostAC = () => ({ type: ADD_POST } as const);
export const updateNewPostText = (text: string) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    text: text,
  } as const;
};
export const setStatus = (status: string) => {
  return {
    type: SET_STATUS,
    status,
  } as const;
};
export const setUserProfile = (profile: any) =>
  ({ type: SET_USER_PROFILE, profile } as const);

export const getUserProfile = (userId: string) => (dispatch: any) => {
  usersAPI.getProfile(userId).then((response) => {
    dispatch(setUserProfile(response.data));
  });
};

export const getStatus = (userId: string) => (dispatch: any) => {
  profileAPI.getStatus(userId).then((response) => {
    dispatch(setStatus(response.data));
  });
};

export const updateStatus = (status: string) => (dispatch: any) => {
  profileAPI.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};
