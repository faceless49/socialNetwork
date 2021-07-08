const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';


export type MessageType = {
  id?: number,
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
  // _addPost: () => void
  // _updateNewPostText: (newText: string) => void
  subscribe: (observer: (state: StoreType) => void) => void // * TODO Не уверен
  dispatch: (action: ActionsTypes) => void
}

export type AddPostActionType = {
  type: 'ADD-POST'
  postText: string
}
export type ChangeNewTextActionType = {
  type: 'UPDATE-NEW-POST-TEXT'
  newText: string
}

export type ActionsTypes = AddPostActionType | ChangeNewTextActionType

export const addPostAC = (postText: string): AddPostActionType => {
  return {
    type: ADD_POST,
    postText: postText
  }
}

export const changeNewTextAC = (newText: string): ChangeNewTextActionType => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: newText
  }
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
      newPostText: '',
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
  // _addPost() {
  //   let newPost = {
  //     id: 5,
  //     message: this._state.profilePage.newPostText,
  //     likesCount: 0
  //   };
  //   this._state.profilePage.posts.push(newPost);
  //   this._state.profilePage.newPostText = '';
  //   this._callSubscriber(this);
  // },
  // _updateNewPostText(newText) {
  //   this._state.profilePage.newPostText = newText
  //   this._callSubscriber(this);
  // },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    if (action.type === ADD_POST) {
      let newPost: PostType = {
        id: new Date().getTime(),
        message: action.postText,
        likesCount: 0
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = '';
      this._callSubscriber(this);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText
      this._callSubscriber(this);
    }
  }
}

export default store;

