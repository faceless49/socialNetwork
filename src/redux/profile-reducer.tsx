import {v1} from 'uuid';
import {ActionsTypes} from './redux-store';


const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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
    default:
      return state
  }
}

export const addPostAC = () => ({type: ADD_POST} as const)
export const updateNewPostTextAC = (text: string) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    text: text
  } as const
}
