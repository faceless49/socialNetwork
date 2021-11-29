import React, { FC } from "react";
import {
  createField,
  Input,
  Textarea,
} from "../../common/FormsControls/FormsControls";
import { reduxForm } from "redux-form";
import { ProfileType } from "../../../redux/profile-reducer";

export type ProfileDataFormPropsType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner?: boolean;
  savePhoto: (file: any) => void;
  goToEditMode?: () => void;
  handleSubmit: () => void;
};

const ProfileDataForm: FC<ProfileDataFormPropsType> = ({
  profile,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <button>Save</button>
      </div>
      <div className="">
        <b>Full Name</b>
        {createField("Full name", "fullName", [], Input, {}, "")}
      </div>
      <div className="">
        <b>Looking for a job:</b> {profile?.lookingForAJob ? "yes" : "no"}
      </div>
      {createField("", "lookingForAJob", [], Input, { type: "checkbox" }, "")}

      <div className="">
        <b>My professional skills</b> {profile?.lookingForAJobDescription}
        {createField(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          Textarea,
          "",
          ""
        )}
      </div>

      <div className="">About me: {profile?.aboutMe} </div>
      {createField("About me", "aboutMe", [], Textarea, "", "")}
    </form>
  );
};

export const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(
  //@ts-ignore TODO
  ProfileDataForm
);
