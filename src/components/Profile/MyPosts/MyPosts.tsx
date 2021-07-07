import React from 'react';
import s from './MyPosts.module.scss';
import Post from './Post/Post';
import {ActionsTypes, PostType} from '../../../redux/state';

type MyPostsType = {
  posts: Array<PostType>
  dispatch: (action: ActionsTypes) => void
  newPostText: string
  // updateNewPostText: (newText: string) => void
}


const MyPosts = (props: MyPostsType) => {

  let postElements =
    props.posts.map((p: PostType) =>
      <Post id={p.id}
            message={p.message}
            likesCount={p.likesCount}/>);

  let newPostElement = React.createRef<HTMLTextAreaElement>(); // * TODO type of?

  const addPost = () => {
    props.dispatch({type: 'ADD-POST'});
  }

  const onPostChange = () => {
    if (newPostElement.current) {
      let text = newPostElement.current.value;
      let action = {type: 'UPDATE-NEW-POST-TEXT', newText: text};
      props.dispatch(action.newText);
    }
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
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
