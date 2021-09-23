import React from 'react';
import {addPostAC, PostType, updateNewPostText} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';
import {Dispatch} from 'redux';


type MapStatePropsType = {
  posts: Array<PostType>
  newPostText: string
}

type MapDispatchToPropsType = {
  updateNewPostText: (text: string) => void
  addPost: () => void
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.updateNewPostText
  }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    updateNewPostText: (text: string) => {
      let action = updateNewPostText(text)
      dispatch(action)
    },
    addPost: () => {
      dispatch(addPostAC());
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;
