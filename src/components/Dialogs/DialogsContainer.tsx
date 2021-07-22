import React from 'react';
import {
  DialogType,
  InitialStateType, MessageType,
  sendMessageCreator,
  updateNewMessageBodyCreator
} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';


type MapStatePropsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  newMessageBody: string
};

type MapDispatchPropsType = {
  updateNewMessageBody: (text: string) => void
  sendMessage: () => void
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageBody: state.dialogsPage.newMessageBody
  }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    updateNewMessageBody: (text: string) => {
      dispatch(updateNewMessageBodyCreator(text))
    },
    sendMessage: () => {
      dispatch(sendMessageCreator())
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
//* connect создает контейнерную, отрисует в ней презентационную
//* засунет в нее пропсы из объектов в ()
//* коннектим Диалогс к стору
export default DialogsContainer;
