import React from 'react';
import {ActionsTypes, PostType} from '../../../redux/store';
import {addPostAC, changeNewTextAC} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts';
import {connect} from 'react-redux';

type MyPostsType = {
  posts: Array<PostType>
  dispatch: (action: ActionsTypes) => void
  newPostText: string
}
let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text: string) => {
      let action = changeNewTextAC(text)
      dispatch(action)
    },
    addPost: () => {
      dispatch(addPostAC());
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;
