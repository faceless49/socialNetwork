import s from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React, {ChangeEvent} from 'react';
import {DialogType, MessageType} from '../../redux/dialogs-reducer';

type PropsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  updateNewMessageBody: (body: string) => void
  sendMessage: () => void
  newMessageBody: string
};


const Dialogs = (props: PropsType) => {


  let dialogsElements =
    props.dialogs.map((d: DialogType) => <DialogItem key={d.id} name={d.name} id={d.id}/>);
  let messagesElements =
    props.messages.map((m: MessageType) => <Message key={m.id} message={m.message} id={m.id}/>);

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
              value={props.newMessageBody}
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
