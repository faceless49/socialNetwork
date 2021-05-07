import s from './../Dialogs.module.scss';


const Message = (props: any) => {
  return <div className={s.dialog}>{props.message}</div>
}


export default Message;
