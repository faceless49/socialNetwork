import {ActionsTypes, PostType, ProfilePageType} from './store';


const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState:ProfilePageType = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'It\'s my first post', likesCount: 11},
    {id: 2, message: 'Blala', likesCount: 11},
    {id: 2, message: 'Dada', likesCount: 15},
  ],
  newPostText: 'it-kamasutra',
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {

  switch (action.type) {
    case ADD_POST:
      let newPost: PostType = {
        id: new Date().getTime(),
        message: state.newPostText,
        likesCount: 0
      };
      state.posts.push(newPost);
      state.newPostText = '';
      return state
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText
      return state
    default:
      return state
  }
}

export const addPostAC = () => ({type: ADD_POST} as const)
export const changeNewTextAC = (newText: string) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: newText
  } as const
}
