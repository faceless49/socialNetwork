type MessageType = {
  id: number,
  message: string,
}

type DialogType = {
  id: number,
  name: string,
}

type PostType = {
  id: number,
  message: string,
  likesCount: number,
}

type ProfilePageType = {
  posts: Array<PostType>
}

type DialogPageType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
}

type SidebarType = {}

type RootStateType = {
  profilePage: ProfilePageType,
  dialogsPage: DialogPageType,
  // sidebar: SidebarType,
}

let state: RootStateType = {
  profilePage: {
    posts: [
      {id: 1, message: 'Hi, how are you?', likesCount: 12},
      {id: 2, message: 'It\'s my first post', likesCount: 11},
      {id: 2, message: 'Blala', likesCount: 11},
      {id: 2, message: 'Dada', likesCount: 15},
    ],
  },

  dialogsPage: {
    dialogs: [
      {id: 1, name: 'Dmitry'},
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

export default state;
