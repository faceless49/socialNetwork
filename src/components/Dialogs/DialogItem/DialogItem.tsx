import s from './../Dialogs.module.scss';
import {NavLink} from "react-router-dom";
import {DialogType} from '../../../redux/state';

const DialogItem = (props: DialogType) => {
  let path = "/dialogs/" + props.id;

  return <div className={s.dialog + ' ' + s.active}>
    <NavLink to={path}>{props.name}</NavLink>
  </div>
}

export default DialogItem;
