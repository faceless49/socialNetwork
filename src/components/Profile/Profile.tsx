import React from 'react';
import s from './Profile.module.scss';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ActionsTypes, ProfilePageType} from '../../redux/state';

type ProfileType = {
  profilePage: ProfilePageType
  dispatch: (action: ActionsTypes) => void
}

const Profile = (props: ProfileType) => {
  return (
    <div>
      <ProfileInfo/>
      <MyPosts
        posts={props.profilePage.posts}
        dispatch={props.dispatch}
        newPostText={props.profilePage.newPostText}
      />
    </div>
  )
}

export default Profile;
