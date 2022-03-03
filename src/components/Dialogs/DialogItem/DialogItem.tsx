import s from "./../Dialogs.module.scss";
import { NavLink } from "react-router-dom";
import { DialogType } from "../../../types/types";
import React from "react";

const DialogItem: React.FC<DialogType> = ({ id, name }) => {
  let path = "/dialogs/" + id;

  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;
