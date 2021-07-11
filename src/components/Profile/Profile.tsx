import React from 'react';
import s from './Profile.module.scss';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ActionsTypes, ProfilePageType, StoreType} from '../../redux/state';

type ProfileType = {
  // * 40 lesson profilePage: ProfilePageType
  // * 40 lesson dispatch: (action: ActionsTypes) => void
  store: StoreType

};

const Profile = (props: ProfileType) => {
  let state = props.store.getState().profilePage

  return (
    <div>
      <ProfileInfo/>
      <MyPosts
        posts={state.posts}
        dispatch={props.store.dispatch}
        newPostText={state.newPostText}
      />
    </div>
  )
}

export default Profile;
