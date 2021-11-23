import s from "./../Dialogs.module.scss";
import { NavLink } from "react-router-dom";
import { DialogType } from "../../../types/types";

const DialogItem = (props: DialogType) => {
  let path = "/dialogs/" + props.id;

  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
