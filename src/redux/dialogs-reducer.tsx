import {v1} from 'uuid';
import {ActionsTypes} from './redux-store';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';


export type DialogPageType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
  newMessageBody: string;
};
export type MessageType = {
  id?: string;
  message: string;
};
export type DialogType = {
  id: string;
  name: string;
};

let initialState = {
  dialogs: [
    {id: v1(), name: 'Dima'},
    {id: v1(), name: 'Andrew'},
    {id: v1(), name: 'Sveta'},
    {id: v1(), name: 'Sasha'},
    {id: v1(), name: 'Viktor'},
    {id: v1(), name: 'Valera'}
  ] as Array<DialogType>,
  messages: [
    {id: v1(), message: 'Hello world'},
    {id: v1(), message: 'How is your it-kamasutra?'},
    {id: v1(), message: 'Yo'},
    {id: v1(), message: 'Yo'},
    {id: v1(), message: 'Yo'}
  ] as Array<MessageType>,
  newMessageBody: ''
};

export type DialogsInitialStateType = typeof initialState;

export const dialogsReducer = (state: DialogsInitialStateType = initialState, action: ActionsTypes): DialogsInitialStateType => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY: {
      return {
        ...state,
        newMessageBody: action.body
      };
    }
    case SEND_MESSAGE: {
      let body = state.newMessageBody;
      return {
        ...state,
        newMessageBody: '',
        messages: [...state.messages, {id: v1(), message: body}]
      };
      // Идентичная запись 54 строке stateCopy.messages.push({id: 6, message: body});
    }
    default:
      return state;
  }
};

export const sendMessageCreator = () => ({type: SEND_MESSAGE} as const);

export const updateNewMessageBodyCreator = (text: string) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    body: text
  } as const;
};
