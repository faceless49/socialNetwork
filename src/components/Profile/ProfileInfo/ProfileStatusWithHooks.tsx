import { ChangeEvent, useEffect, useState } from "react";

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

export const ProfileStatusWithHooks = (props: PropsType) => {
  let [editMode, setEditmode] = useState<boolean>(false);
  let [status, setStatus] = useState<string>(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  const activeEditMode = () => {
    setEditmode(!editMode);
  };
  const deactivateEditMode = () => {
    setEditmode(false);
    props.updateStatus(status);
  };

  return (
    <>
      {!editMode && (
        <div>
          <span onDoubleClick={activeEditMode}>{props.status || "----"}</span>
        </div>
      )}{" "}
      {editMode && (
        <div>
          <input
            onBlur={deactivateEditMode}
            autoFocus
            value={status}
            onChange={onStatusChange}
          />
        </div>
      )}
    </>
  );
};
