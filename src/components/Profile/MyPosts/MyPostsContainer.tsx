import React from 'react';
import {ActionsTypes, PostType} from '../../../redux/store';
import {addPostAC, changeNewTextAC} from '../../../redux/profile-reducer'
import MyPosts from './MyPosts';

type MyPostsType = {
  posts: Array<PostType>
  dispatch: (action: ActionsTypes) => void
  newPostText: string
}

const MyPostsContainer = (props: MyPostsType) => {

  const addPost = () => {
    props.store.dispatch(addPostAC());
  }

  const onPostChange = (text: string) => {
      let action = changeNewTextAC(text)
      props.store.dispatch(action)
    }


  return <MyPosts
    posts={props.posts}
    dispatch={}
    newPostText={}
    updateNewPostText={onPostChange}
    addPost={addPost}
  />
}

export default MyPostsContainer;
