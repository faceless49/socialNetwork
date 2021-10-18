import { PostType } from "./profile-reducer";
import { ActionsTypes } from "./redux-store";

// export type MessageType = {
//   id?: string;
//   message: string;
// };

// export type ProfilePageType = {
//   posts: Array<PostType>;
//   newPostText: string;
// };
//
// type DialogPageType = {
//   dialogs: Array<DialogType>;
//   messages: Array<MessageType>;
//   newMessageBody: string;
// };

// type StateType = {
//   profilePage: ProfilePageType;
//   dialogsPage: DialogPageType;
// };

// type StoreType = {
//   _state: StateType;
//   getState: () => StateType;
//   _callSubscriber: (store: StoreType) => void;
//   subscribe: (observer: (state: StoreType) => void) => void;
//   dispatch: (action: ActionsTypes) => void;
// };

// let store: StoreType = {
//   _state: {
//     profilePage: {
//       posts: [
//         {id: v1(), message: 'Hi, how are you?', likesCount: 12},
//         {id: v1(), message: 'It\'s my first post', likesCount: 11},
//         {id: v1(), message: 'Blala', likesCount: 11},
//         {id: v1(), message: 'Dada', likesCount: 15}
//       ],
//       newPostText: 'it-kama'
//     },
//
//     dialogsPage: {
//       dialogs: [
//         {id: v1(), name: 'Dima'},
//         {id: v1(), name: 'Andrew'},
//         {id: v1(), name: 'Sveta'},
//         {id: v1(), name: 'Sasha'},
//         {id: v1(), name: 'Viktor'},
//         {id: v1(), name: 'Valera'}
//       ],
//       messages: [
//         {id: v1(), message: 'Hello world'},
//         {id: v1(), message: 'How is your it-kamasutra?'},
//         {id: v1(), message: 'Yo'},
//         {id: v1(), message: 'Yo'},
//         {id: v1(), message: 'Yo'}
//       ],
//       newMessageBody: ''
//     }
//   },
//   getState() {
//     return this._state;
//   },
//   _callSubscriber(store) {
//     console.log('state is changed');
//   },
//   // _addPost() {
//   //   let newPost = {
//   //     id: 5,
//   //     message: this._state.profilePage.newPostText,
//   //     likesCount: 0
//   //   };
//   //   this._state.profilePage.posts.push(newPost);
//   //   this._state.profilePage.newPostText = '';
//   //   this._callSubscriber(this);
//   // },
//   // _updateNewPostText(newText) {
//   //   this._state.profilePage.newPostText = newText
//   //   this._callSubscriber(this);
//   // },
//   subscribe(observer) {
//     this._callSubscriber = observer;
//   },
//
//   dispatch(action) {
//     // this._state.profilePage = profileReducer(this._state.profilePage, action)
//     // this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//
//     this._callSubscriber(this);
//   }
// };
