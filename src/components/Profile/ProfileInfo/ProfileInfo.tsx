import s from "./ProfileInfo.module.scss";
import userPhoto from "./../../../assets/img/user.png";
import { Preloader } from "../../common/preloader/Preloader";
import React, { ChangeEvent, FC, useState } from "react";
import { ProfilePropsType } from "../Profile";
import { ContactsType, ProfileType } from "../../../redux/profile-reducer";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo: React.FC<ProfilePropsType> = ({
  profile,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      savePhoto(e.currentTarget.files[0]);
    }
  };
  const onSubmit = (formData: ProfileType) => {
    // todo: remove then
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

        {editMode ? (
          <ProfileDataForm
            // @ts-ignore
            onSubmit={onSubmit}
            initialValues={profile}
            profile={profile}
          />
        ) : (
          <ProfileData
            profile={profile}
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

export const Contact: FC<ContactPropsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={s.contact}>
      <b>
        {contactTitle}: {contactValue}
      </b>
    </div>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};
const ProfileData: FC<ProfileDataPropsType> = ({
  profile,
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
        <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
      </div>

      {profile.lookingForAJob && (
        <div className="">
          <b>My professional skills</b> {profile.lookingForAJobDescription}
        </div>
      )}
      <div className="">
        <b>
          Contacts:
          {Object.keys(profile.contacts).map((key) => {
            return (
              <Contact
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key as keyof ContactsType]}
              />
            );
            //@TODO: Refactor 97L
          })}
        </b>
      </div>
    </>
  );
};

export default ProfileInfo;
