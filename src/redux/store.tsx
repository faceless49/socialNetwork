import {
  addPostAC,
  updateNewPostTextAC,
  profileReducer,
  PostType
} from "./profile-reducer";
import {
  dialogsReducer,
  sendMessageCreator,
  updateNewMessageBodyCreator
} from "./dialogs-reducer";
import { showMoreAC, subscribeAC } from "./users-reducer";

export type MessageType = {
  id?: number;
  message: string;
};

type DialogType = {
  id: number;
  name: string;
};

export type ProfilePageType = {
  posts: Array<PostType>;
  newPostText: string;
};

type DialogPageType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
  newMessageBody: string;
};

type StateType = {
  profilePage: ProfilePageType;
  dialogsPage: DialogPageType;
};

type StoreType = {
  _state: StateType;
  getState: () => StateType;
  _callSubscriber: (store: StoreType) => void;
  subscribe: (observer: (state: StoreType) => void) => void;
  dispatch: (action: ActionsTypes) => void;
};

export type ActionsTypes =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostTextAC>
  | ReturnType<typeof updateNewMessageBodyCreator>
  | ReturnType<typeof sendMessageCreator>
  | ReturnType<typeof subscribeAC>
  | ReturnType<typeof showMoreAC>;

let store: StoreType = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 11 },
        { id: 2, message: "Blala", likesCount: 11 },
        { id: 2, message: "Dada", likesCount: 15 }
      ],
      newPostText: "it-kama"
    },

    dialogsPage: {
      dialogs: [
        { id: 1, name: "Dima" },
        { id: 2, name: "Andrew" },
        { id: 3, name: "Sveta" },
        { id: 4, name: "Sasha" },
        { id: 5, name: "Viktor" },
        { id: 6, name: "Valera" }
      ],
      messages: [
        { id: 1, message: "Hello world" },
        { id: 2, message: "How is your it-kamasutra?" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo" }
      ],
      newMessageBody: ""
    }
  },
  getState() {
    return this._state;
  },
  _callSubscriber(store) {
    console.log("state is changed");
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
    // this._state.profilePage = profileReducer(this._state.profilePage, action)
    // this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

    this._callSubscriber(this);
  }
};

export default store;
