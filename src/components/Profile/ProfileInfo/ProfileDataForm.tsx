import React, { FC } from "react";
import {
  createField,
  GetStringKeys,
  Input,
  Textarea,
} from "../../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ProfileType } from "../../../redux/profile-reducer";
import styles from "../../common/FormsControls/FormsControls.module.scss";

// export type ProfileDataFormPropsType = {
//   profile: ProfileType;
//   status: string;
//   updateStatus: (status: string) => void;
//   isOwner?: boolean;
//   savePhoto: (file: any) => void;
//   goToEditMode?: () => void;
//   handleSubmit: () => void;
// };
// type ProfileDataFormValuesType = {
//   profile: ProfileType;
//   status: string;
//   isOwner?: boolean;
// };
// type ProfileDataFormOwnProps = {
//   updateStatus: (status: string) => void;
//   savePhoto: (file: any) => void;
//   goToEditMode?: () => void;
//   handleSubmit: () => void;
// };
//
// type ProfileDataFormValuesTypeKeys = Extract<keyof ProfileType, string>;
// type ContactValuesTypeKeys = Extract<keyof ContactsType, string>;

type PropsType = {
  profile: ProfileType;
};
type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({ handleSubmit, error, profile }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <button>Save</button>
      </div>
      {error && <div className={styles.formSummaryError}>{error}</div>}

      <div className="">
        <b>Full Name</b>
        {createField<ProfileTypeKeys>(
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
      {createField<ProfileTypeKeys>(
        "",
        "lookingForAJob",
        [],
        Input,
        { type: "checkbox" },
        ""
      )}

      <div className="">
        <b>My professional skills</b> {profile.lookingForAJobDescription}
        {createField<ProfileTypeKeys>(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          Textarea,
          "",
          ""
        )}
      </div>

      <div className="">About me: {profile.aboutMe} </div>
      {createField<ProfileTypeKeys>(
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
              <b>
                {key}:{createField(key, "contacts." + key, [], Input, {}, "")}
              </b>
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
