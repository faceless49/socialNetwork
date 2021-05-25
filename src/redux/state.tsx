import {rerenderEntireTree} from '../render';

export type MessageType = {
  id?: number, // TODO: This correct  decision?
  message: string,
}

export type DialogType = {
  id: number,
  name: string,
}

export type PostType = {
  id: number,
  message: string,
  likesCount: number,
}


export type ProfilePageType = {
  posts: Array<PostType>,
  newPostText: string
}

export type DialogPageType = {
  dialogs: Array<DialogType>,
  messages: Array<MessageType>
}


// export type SidebarType = {}

export type RootStateType = {
  profilePage: ProfilePageType,
  dialogsPage: DialogPageType,
  // sidebar: SidebarType,
}


const state: RootStateType = {
  profilePage: {
    posts: [
      {id: 1, message: 'Hi, how are you?', likesCount: 12},
      {id: 2, message: 'It\'s my first post', likesCount: 11},
      {id: 2, message: 'Blala', likesCount: 11},
      {id: 2, message: 'Dada', likesCount: 15},
    ],
    newPostText: 'it-kamasutra',
  },

  dialogsPage: {
    dialogs: [
      {id: 1, name: 'Dima'},
      {id: 2, name: 'Andrew'},
      {id: 3, name: 'Sveta'},
      {id: 4, name: 'Sasha'},
      {id: 5, name: 'Viktor'},
      {id: 6, name: 'Valera'},
    ],
    messages: [
      {id: 1, message: 'Hello world'},
      {id: 2, message: 'How is your it-kamasutra?'},
      {id: 3, message: 'Yo'},
      {id: 4, message: 'Yo'},
      {id: 5, message: 'Yo'},
    ],
  },
};


export const addPost = (postMessage: any) => {
  const newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    likesCount: 0
  };
  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = '';
  rerenderEntireTree(state)
}

export const updateNewPostText = (newText: string) => {
  state.profilePage.newPostText = newText
  rerenderEntireTree(state)
}


export default state;

