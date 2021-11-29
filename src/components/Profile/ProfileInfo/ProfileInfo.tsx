import s from "./ProfileInfo.module.scss";
import userPhoto from "./../../../assets/img/user.png";
import { Preloader } from "../../common/preloader/Preloader";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";
import React, { ChangeEvent, FC, useState } from "react";
import { ProfilePropsType } from "../Profile";
import { ProfileDataFormReduxForm } from "./ProfileDataForm";

const ProfileInfo: React.FC<ProfilePropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };
  const onSubmit = (formData: any) => {
    console.log(formData);
  };
  return (
    <div>
      <div>
        <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" />
      </div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

        {editMode ? (
          <ProfileDataFormReduxForm onSubmit={onSubmit} />
        ) : (
          <ProfileData
            profile={profile}
            status={status}
            updateStatus={updateStatus}
            savePhoto={savePhoto}
            isOwner={isOwner}
            goToEditMode={() => {
              setEditMode(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

type ContactPropsType = {
  contactTitle: string;
  contactValue: string;
};

const Contact: FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>
        {contactTitle}: {contactValue}
      </b>
    </div>
  );
};

const ProfileData: FC<ProfilePropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  goToEditMode,
}) => {
  return (
    <>
      {isOwner && (
        <div className="">
          <button onClick={goToEditMode}>Edit</button>
        </div>
      )}
      <div className="">
        <b>Full Name</b> {profile.fullName}
      </div>
      <div className="">
        <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}{" "}
      </div>

      {profile.lookingForAJob && (
        <div className="">
          <b>My professional skills</b> {profile.lookingForAJobDescription}{" "}
        </div>
      )}
      <div className="">
        <b>
          Contacts:
          {Object.keys(profile.contacts).map((key) => {
            <Contact
              contactTitle={key}
              //@ts-ignore
              contactValue={profile.contacts[key]}
            />;
            //@TODO: Refactor 97L
          })}
        </b>
      </div>
      <div className="">About me: {profile.aboutMe} </div>
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
    </>
  );
};

export default ProfileInfo;
