import s from "./ProfileInfo.module.scss";
import { Preloader } from "../../common/preloader/Preloader";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";
import React from "react";
import { ProfilePropsType } from "../Profile";

const ProfileInfo: React.FC<ProfilePropsType> = ({
  profile,
  status,
  updateStatus,
}) => {
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" />
      </div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.small} />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
