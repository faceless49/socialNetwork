import React from 'react';
import s from './MyPosts.module.scss';
import Post from './Post/Post';
import {PostType} from '../../../redux/state';

type MyPostsType = {
  posts: Array<PostType>
  addPost: () => void
  newPostText: string
  updateNewPostText: (newText: string) => void
}


const MyPosts = (props: MyPostsType) => {

  let postElements =
    props.posts.map((p: any) => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>);

  let newPostElement: any = React.createRef();

  let addPost = () => {
    props.addPost();
  }
  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text)
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
