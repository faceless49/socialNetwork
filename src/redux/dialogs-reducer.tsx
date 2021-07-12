import {ActionsTypes, DialogPageType} from './store';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';


let initialState:DialogPageType =  {
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
    newMessageBody: ''
  }

export const dialogsReducer = (state: DialogPageType = initialState, action: ActionsTypes): DialogPageType => {

  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.messageBody;
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

export const sendMessageCreator = () => {
  return {
    type: SEND_MESSAGE
  } as const
}
export const updateNewMessageBodyCreator = (messageBody: string) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    messageBody: messageBody
  } as const
}
