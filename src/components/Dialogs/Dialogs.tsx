import s from "./Dialogs.module.scss";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import { AddMessageFormRedux } from "./AddMessageForm";
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
};

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

const Dialogs: React.FC<OwnTypeProps> = ({
  dialogs,
  messages,
  sendMessage,
  ...restProps
}) => {
  let dialogsElements = dialogs.map(({ id, name }) => (
    <DialogItem key={id} name={name} id={id} />
  ));
  let messagesElements = messages.map(({ id, message }) => (
    <Message key={id} message={message} id={id} />
  ));

  // if (!props.isAuth) return <Redirect to={"/login"} />; IN Hoc!
  const addNewMessage = (values: NewMessageFormValuesType) => {
    sendMessage(values.newMessageBody);
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
