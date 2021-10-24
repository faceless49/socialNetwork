import s from "./Dialogs.module.scss";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import { MessageType } from "../../redux/dialogs-reducer";
import { AddMessageFormRedux } from "./AddMessageForm";

type DialogType = {
  id: string;
  name: string;
};

type PropsType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
  updateNewMessageBody: (body: string) => void;
  sendMessage: (values: Array<string>) => void;
  newMessageBody: string;
  isAuth: boolean;
};

const Dialogs = (props: PropsType) => {
  let dialogsElements = props.dialogs.map((d: DialogType) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ));
  let messagesElements = props.messages.map((m: MessageType) => (
    <Message key={m.id} message={m.message} id={m.id} />
  ));

  // if (!props.isAuth) return <Redirect to={"/login"} />;
  const addNewMessage = (values: any) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div></div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
