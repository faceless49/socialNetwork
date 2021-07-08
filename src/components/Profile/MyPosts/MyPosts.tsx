import React from 'react';
import s from './MyPosts.module.scss';
import Post from './Post/Post';
import {ActionsTypes, addPostAC, PostType} from '../../../redux/state';

type MyPostsType = {
  posts: Array<PostType>
  dispatch: (action: ActionsTypes) => void
  newPostText: string
}


let addPostActionCreator = () => {
  return {
    type: 'ADD-POST'
  }
}

const MyPosts = (props: MyPostsType) => {

  let postElements =
    props.posts.map((p: PostType) =>
      <Post id={p.id}
            message={p.message}
            likesCount={p.likesCount}/>).reverse();

  let postMessageRef = React.createRef<HTMLTextAreaElement>();

  const addPost = () => {
    props.dispatch(addPostAC(props.newPostText));
  }

  const onPostChange = () => {
    if (postMessageRef.current) {
      let text = postMessageRef.current.value;
      let action = {type: 'UPDATE-NEW-POST-TEXT', newText: text}; // * TODO: Why not working action in dispatch?
      props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text});
      // ? add this string after SUPPORT with QUESTION 37 STRING
      // props.dispatch(changeNewTextAC(text));
    }
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={postMessageRef}
            value={props.newPostText}/>
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        {postElements}
      </div>
    </div>
  )
}

export default MyPosts;
