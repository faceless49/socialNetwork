import React from 'react';
import {DialogType, sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';


type MapStatePropsType = {
  dialogsPage: DialogType
}

type MapDispatchPropsType = {
  updateNewMessageBody: () => void
  sendMessage: (newMessageBody: string) => void
}


let mapStateToProps = (state: AppStateType):MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage
  }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    updateNewMessageBody: () => {
      dispatch(sendMessageCreator())
    },
    sendMessage: (newMessageBody) => {
      dispatch(updateNewMessageBodyCreator(newMessageBody))
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
//* connect создает контейнерную, отрисует в ней презентационную
//* засунет в нее пропсы из объектов в ()
//* коннектим Диалогс к стору
export default DialogsContainer;
