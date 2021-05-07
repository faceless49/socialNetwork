import s from './Dialogs.module.scss';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";


const Message = (props: any) => {
  return <div className={s.dialog}>{props.message}</div>
}

const Dialogs = (props: any) => {

  let dialogsElements =
    props.dialogs.map((d: any) => <DialogItem name={d.name} id={d.id}/>);
  let messagesElements =
    props.messages.map((m: any) => <Message message={m.message}/>);

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}
      </div>
    </div>
  )
}

export default Dialogs;
