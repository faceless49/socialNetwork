import s from "./Dialogs.module.scss";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import { AddMessageFormRedux, MessageFormValuesType } from "./AddMessageForm";
import { MessageType } from "../../types/types";

type DialogType = {
  id: string;
  name: string;
};

type OwnTypeProps = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
  updateNewMessageBody: (body: string) => void;
  sendMessage: (values: string) => void;
  newMessageBody: string;
  isAuth: boolean;
};

export type NewMessageFormType = {
  newMessageBody: string;
};

const Dialogs: React.FC<OwnTypeProps> = (props) => {
  let dialogsElements = props.dialogs.map((d: DialogType) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ));
  let messagesElements = props.messages.map((m: MessageType) => (
    <Message key={m.id} message={m.message} id={m.id} />
  ));

  // if (!props.isAuth) return <Redirect to={"/login"} />; IN Hoc!
  const addNewMessage = (values: NewMessageFormType) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
