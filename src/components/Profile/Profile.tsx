import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ActionsTypes, StoreType} from '../../redux/store';
import MyPostsContainer from './MyPosts/MyPostsContainer';

type ProfileType = {
  store: StoreType
  dispatch: (action: ActionsTypes) => void
};

const Profile = (props: ProfileType) => {
  let state = props.store.getState().profilePage

  return (
    <div>
      <ProfileInfo/>
      <MyPostsContainer store={props.store}/>
    </div>
  )
}

export default Profile;
