import React from 'react';
import s from './MyPosts.module.scss';
import Post from './Post/Post';
import {ActionsTypes, PostType} from '../../../redux/store';
import {addPostAC, changeNewTextAC} from '../../../redux/profile-reducer'

type MyPostsType = {
  posts: Array<PostType>
  dispatch: (action: ActionsTypes) => void
  newPostText: string
}


// let addPostActionCreator = () => {
//   return {
//     type: 'ADD-POST'
//   }
// }

const MyPosts = (props: MyPostsType) => {

  let postElements =
    props.posts.map((p: PostType) =>
      <Post id={p.id}
            message={p.message}
            likesCount={p.likesCount}/>).reverse();

  let postMessageRef = React.createRef<HTMLTextAreaElement>();

  const addPost = () => {
    props.dispatch(addPostAC());
  }

  const onPostChange = () => {
    if (postMessageRef.current) {
      let text = postMessageRef.current.value;
      let action = changeNewTextAC(text)
      props.dispatch(action)
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
