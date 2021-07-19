import s from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React, {ChangeEvent} from 'react';

import {
  DialogType,
  MessageType,
  StoreType,

} from '../../redux/store';
import {updateNewMessageBodyCreator, sendMessageCreator} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs';

type PropsType = {
  //*state: DialogPageType 40 lesson
  //* dispatch: (action: ChangeNewMessageBodyActionType | AddMessageActionType) => void 40 lesson
  store: StoreType
};


const DialogsContainer = (props: PropsType) => {

  let state = props.store.getState().dialogsPage

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator())
  }

  let onNewMessageChange = (updateNewMessageBody) => {
    props.store.dispatch(updateNewMessageBodyCreator(newMessageBody))
  }


  return <Dialogs
    updateNewMessageBody={updateNewMessageBody}
    sendMessage={onSendMessageClick}
    dialogsPage={state}
  />
}

export default DialogsContainer;
