import React from "react";
import s from "./MyPosts.module.scss";
import Post from "./Post/Post";
import { PostType } from "../../../redux/profile-reducer";
import { maxLengthCreator } from "../../../utils/validators/validators";
import AddNewPostForm, {
  AddPostFormValuesType,
} from "./AddNewPostForm/AddNewPostForm";

type MyPostsType = {
  posts: Array<PostType>;
  addPost: (newPostText: string) => void;
};

export const MyPosts = React.memo((props: MyPostsType) => {
  let postElements = [...props.posts]
    .reverse()
    .map(({ id, message, likesCount }) => (
      <Post id={id} message={message} likesCount={likesCount} />
    ));

  const onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <AddNewPostForm onSubmit={onAddPost} />
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
});

const maxLength10 = maxLengthCreator(10);
