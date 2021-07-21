import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ActionsTypes, StoreType} from '../../redux/store';
import MyPostsContainer from './MyPosts/MyPostsContainer';

type ProfileType = {
  store: StoreType
  dispatch: (action: ActionsTypes) => void
};

const Profile = (props: any) => {

  return (
    <div>
      <ProfileInfo/>
      <MyPostsContainer />
    </div>
  )
}

export default Profile;
