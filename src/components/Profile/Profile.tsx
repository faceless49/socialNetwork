import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../redux/profile-reducer";

export type ProfilePropsType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner?: boolean;
  savePhoto: (file: any) => void;
  goToEditMode?: () => void;
};
const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
