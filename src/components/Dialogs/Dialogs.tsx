import s from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React, {ChangeEvent} from 'react';
import {AppStateType} from '../../redux/redux-store';
import {DialogType, MessageType} from '../../redux/dialogs-reducer';

type PropsType = {
  store: AppStateType
};


const Dialogs = (props: any) => {

  let state = props.dialogsPage


  let dialogsElements =
    state.dialogs.map((d: DialogType) => <DialogItem key={d.id} name={d.name} id={d.id}/>);
  let messagesElements =
    state.messages.map((m: MessageType) => <Message key={m.id} message={m.message} id={m.id}/>);

  let newMessageBody = state.newMessageBody

  let onSendMessageClick = () => {
    props.sendMessage()
  }

  let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let body = e.currentTarget.value;
    props.updateNewMessageBody(body)
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
