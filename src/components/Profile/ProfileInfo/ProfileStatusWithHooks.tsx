import { ChangeEvent, useState } from "react";

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

export const ProfileStatusWithHooks = (props: PropsType) => {
  let [editMode, setEditmode] = useState<boolean>(false);
  let [status, setStatus] = useState<string>(props.status);
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  const activeEditmode = () => {
    setEditmode(!editMode);
  };
  const deactivateEditmode = () => {
    setEditmode(false);
    props.updateStatus(status);
  };

  return (
    <>
      {!editMode && (
        <div>
          <span onDoubleClick={activeEditmode}>{props.status || "----"}</span>
        </div>
      )}{" "}
      {editMode && (
        <div>
          <input
            onBlur={deactivateEditmode}
            autoFocus
            value={status}
            onChange={onStatusChange}
          />
        </div>
      )}
    </>
  );
};
