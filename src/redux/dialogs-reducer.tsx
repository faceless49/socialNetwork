import {ActionsTypes, DialogPageType} from './store';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';




export const dialogsReducer = (state: DialogPageType, action: ActionsTypes): DialogPageType => {

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
