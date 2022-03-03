import s from "./../Dialogs.module.scss";
import { MessageType } from "../../../types/types";
import { FC } from "react";

const Message: FC<MessageType> = ({ message }) => {
  return <div className={s.dialog}>{message}</div>;
};

export default Message;
