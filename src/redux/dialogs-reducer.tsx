import {ActionsTypes} from './store';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';


export type MessageType = {
  id?: number,
  message: string,
}

export type DialogType = {
  id: number,
  name: string,
}


let initialState = {
  dialogs: [
    {id: 1, name: 'Dima'},
    {id: 2, name: 'Andrew'},
    {id: 3, name: 'Sveta'},
    {id: 4, name: 'Sasha'},
    {id: 5, name: 'Viktor'},
    {id: 6, name: 'Valera'},
  ] as Array<DialogType>,
  messages: [
    {id: 1, message: 'Hello world'},
    {id: 2, message: 'How is your it-kamasutra?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Yo'},
    {id: 5, message: 'Yo'},
  ] as Array<MessageType>,
  newMessageBody: '' as string
}

export type InitialStateType = typeof initialState


export const dialogsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body;
      return state
    case SEND_MESSAGE:
      let body = state.newMessageBody;
      state.newMessageBody = '';
      state.messages.push({id: 6, message: body});
      return state
    default:
      return state
  }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE}) as const

export const updateNewMessageBodyCreator = (body: string) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
  } as const
}
