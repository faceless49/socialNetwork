import {v1} from 'uuid';
import {ActionsTypes} from './redux-store';
import {usersAPI} from '../api/api';


const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE'

export type ProfilePageType = {
  posts: Array<PostType>;
  newPostText: string;
};

export type PostType = {
  id: string,
  message: string,
  likesCount: number,
}

let initialState = {
  posts: [
    {id: v1(), message: 'Hi, how are you?', likesCount: 12},
    {id: v1(), message: 'It\'s my first post', likesCount: 11},
    {id: v1(), message: 'Blala', likesCount: 11},
    {id: v1(), message: 'Dada', likesCount: 15},
  ] as Array<PostType>,
  updateNewPostText: 'it-kamasutra' as string,
  profile: null
}

export type InitialStateType = typeof initialState


export const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

  switch (action.type) {
    case ADD_POST: {
      let newPost: PostType = {
        id: v1(),
        message: state.updateNewPostText,
        likesCount: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        updateNewPostText: ''
      }
    }
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        updateNewPostText: action.text
      }
    case SET_USER_PROFILE:
      return {...state, profile: action.profile}
    default:
      return state
  }
}

export const addPostAC = () => ({type: ADD_POST} as const)
export const updateNewPostText = (text: string) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    text: text
  } as const
}
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile} as const)


export const getUserProfile = (userId: any) => (dispatch: any) => {
  usersAPI.getProfile(userId).then((response) => {
    dispatch(setUserProfile(response.data))
  });
}
