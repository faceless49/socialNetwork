import s from './Dialogs.module.scss';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";



const Dialogs = (props: any) => {

  let dialogsElements =
    props.state.dialogs.map((d: any) => <DialogItem name={d.name} id={d.id}/>);
  let messagesElements =
    props.state.messages.map((m: any) => <Message message={m.message}/>);

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
