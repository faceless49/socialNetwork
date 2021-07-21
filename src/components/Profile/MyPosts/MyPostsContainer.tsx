import React from 'react';
import {addPostAC, updateNewPostTextAC} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts';
import {connect} from 'react-redux';

export type PostType = {
  id: number,
  message: string,
  likesCount: number,
}

type MapStatePropsType = {
  profilePage:
}

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    // newPostText: state.profilePage.newPostText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text: string) => {
      let action = updateNewPostTextAC(text)
      dispatch(action)
    },
    addPost: () => {
      dispatch(addPostAC());
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;
