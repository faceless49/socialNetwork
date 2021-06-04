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

export type RootStateType = {
  profilePage: ProfilePageType,
  dialogsPage: DialogPageType,
}

export type StoreType = {
  _state: RootStateType
  getState: () => RootStateType
  _callSubscriber: (store: StoreType) => void
  addPost: () => void
  updateNewPostText: (newText: string) => void
  subscribe: (observer: (state: StoreType) => void) => void // * TODO Не уверен
}


let store: StoreType = {
  _state: {
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
  },
  getState() {
    return this._state
  },
  _callSubscriber(store) {
    console.log('state is changed')
  },
  addPost() {
    let newPost = {
      id: 5,
      message: this._state.profilePage.newPostText,
      likesCount: 0
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = '';
    this._callSubscriber(this);
  },
  updateNewPostText(newText) {
    this._state.profilePage.newPostText = newText
    this._callSubscriber(this);
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
}

export default store;

