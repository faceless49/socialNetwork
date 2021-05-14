import s from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import React from 'react';


const Dialogs = (props: any) => {

  let dialogsElements =
    props.state.dialogs.map((d: any) => <DialogItem name={d.name} id={d.id}/>);
  let messagesElements =
    props.state.messages.map((m: any) => <Message message={m.message} id={m.id}/>);

  let newMessageElement: any = React.createRef();
  let addMessage = () => {
    let text = newMessageElement.current.value;
    alert(text)
  }


  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}
        <form>
          <textarea ref={newMessageElement}/>
          <button onClick={addMessage} type={'button'}>Send message</button>
        </form>
      </div>
    </div>
  )
}
// * TODO: why clicked button page reload in form?
// * 1. Убрать форму?
// * 2. button type= button?
// * 3. onSubmit = e.preventDefault()?
// * 4. e.preventDefault()?

export default Dialogs;
