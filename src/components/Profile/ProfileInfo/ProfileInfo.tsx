import s from "./ProfileInfo.module.scss";
import userPhoto from "./../../../assets/img/user.png";
import { Preloader } from "../../common/preloader/Preloader";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";
import React, { ChangeEvent } from "react";
import { ProfilePropsType } from "../Profile";

const ProfileInfo: React.FC<ProfilePropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
}) => {
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };
  return (
    <div>
      <div>
        <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" />
      </div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
