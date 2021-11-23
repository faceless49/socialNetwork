import s from "./../Dialogs.module.scss";
import { MessageType } from "../../../types/types";

const Message = (props: MessageType) => {
  return <div className={s.dialog}>{props.message}</div>;
};

export default Message;
