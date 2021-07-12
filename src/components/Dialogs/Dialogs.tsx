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

type PropsType = {
  //*state: DialogPageType 40 lesson
  //* dispatch: (action: ChangeNewMessageBodyActionType | AddMessageActionType) => void 40 lesson
  store: StoreType
};


const Dialogs = (props: PropsType) => {

  let state = props.store.getState().dialogsPage

  //* 40lesson let dialogsElements =
  //   props.state.dialogs.map((d: DialogType) => <DialogItem key={d.id} name={d.name} id={d.id}/>);
  // let messagesElements =
  //   props.state.messages.map((m: MessageType) => <Message key={m.id} message={m.message} id={m.id}/>);
  let dialogsElements =
    state.dialogs.map((d: DialogType) => <DialogItem key={d.id} name={d.name} id={d.id}/>);
  let messagesElements =
    state.messages.map((m: MessageType) => <Message key={m.id} message={m.message} id={m.id}/>);

  let newMessageBody = state.newMessageBody

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator())
  }

  let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newMessageBody = e.currentTarget.value;
    props.store.dispatch(updateNewMessageBodyCreator(newMessageBody))
  }


  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div>
          <div>
            <textarea
              value={newMessageBody}
              onChange={onNewMessageChange}
              placeholder={'Enter your message'}
            />
          </div>
          <div>
            <button
              onClick={onSendMessageClick}
              type={'button'}>Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialogs;
