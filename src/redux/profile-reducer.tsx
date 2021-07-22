import {ActionsTypes} from './store';


const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export type PostType = {
  id: number,
  message: string,
  likesCount: number,
}

let initialState = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'It\'s my first post', likesCount: 11},
    {id: 2, message: 'Blala', likesCount: 11},
    {id: 2, message: 'Dada', likesCount: 15},
  ] as Array<PostType>,
  updateNewPostText: 'it-kamasutra' as string,
}

export type InitialStateType = typeof initialState


export const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

  switch (action.type) {
    case ADD_POST: {
      let newPost: PostType = {
        id: new Date().getTime(),
        message: state.updateNewPostText,
        likesCount: 0
      };
      let stateCopy = {...state}
      stateCopy.posts.push(newPost);
      stateCopy.updateNewPostText = '';
      return stateCopy
    }
    case UPDATE_NEW_POST_TEXT:
      let stateCopy = {...state}
      stateCopy.updateNewPostText = action.text // ? TODO imm mass
      return stateCopy
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
