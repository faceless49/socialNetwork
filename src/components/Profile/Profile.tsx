import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ActionsTypes, StoreType} from '../../redux/store';

type ProfileType = {
  store: StoreType
  dispatch: (action: ActionsTypes) => void
};

const Profile = (props: ProfileType) => {
  let state = props.store.getState().profilePage

  return (
    <div>
      <ProfileInfo/>
      <MyPosts
        posts={state.posts}
        dispatch={props.dispatch}
        newPostText={state.newPostText}
      />
    </div>
  )
}

export default Profile;
