import React, { FC } from "react";
import {
  createField,
  Input,
  Textarea,
} from "../../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ContactsType, ProfileType } from "../../../redux/profile-reducer";
import { Contact } from "./ProfileInfo";
import styles from "../../common/FormsControls/FormsControls.module.scss";

export type ProfileDataFormPropsType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner?: boolean;
  savePhoto: (file: any) => void;
  goToEditMode?: () => void;
  handleSubmit: () => void;
};
type ProfileDataFormValuesType = {
  profile: ProfileType;
  status: string;
  isOwner?: boolean;
};
type ProfileDataFormOwnProps = {
  updateStatus: (status: string) => void;
  savePhoto: (file: any) => void;
  goToEditMode?: () => void;
  handleSubmit: () => void;
};

type ProfileDataFormValuesTypeKeys = Extract<keyof ProfileType, string>;
type ContactValuesTypeKeys = Extract<keyof ContactsType, string>;
export const ProfileDataForm: FC<
  InjectedFormProps<ProfileDataFormValuesType, ProfileDataFormOwnProps>
> = ({ handleSubmit, error }, profile) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <button>Save</button>
      </div>
      {error && <div className={styles.formSummaryError}>Error</div>}

      <div className="">
        <b>Full Name</b>
        {createField<ProfileDataFormValuesTypeKeys>(
          "Full name",
          "fullName",
          [],
          Input,
          {},
          ""
        )}
      </div>
      <div className="">
        <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {createField<ProfileDataFormValuesTypeKeys>(
        "",
        "lookingForAJob",
        [],
        Input,
        { type: "checkbox" },
        ""
      )}

      <div className="">
        <b>My professional skills</b> {profile.lookingForAJobDescription}
        {createField<ProfileDataFormValuesTypeKeys>(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          Textarea,
          "",
          ""
        )}
      </div>

      <div className="">About me: {profile.aboutMe} </div>
      {createField<ProfileDataFormValuesTypeKeys>(
        "About me",
        "aboutMe",
        [],
        Textarea,
        "",
        ""
      )}
      <div className="">
        <b>Contacts: </b>

        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className="">
              {key}:
              {createField<ProfileDataFormValuesTypeKeys>(
                key,
                "contacts", //@TODO: + KEY 97 L needed TS
                [],
                Input,
                {},
                ""
              )}
            </div>
          );
          //@TODO: Refactor 97L
        })}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<
  ProfileDataFormValuesType,
  ProfileDataFormOwnProps
>({ form: "edit-profile" })(
  //@ts-ignore TODO
  ProfileDataForm
);
