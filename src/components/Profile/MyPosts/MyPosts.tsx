import React from "react";
import s from "./MyPosts.module.scss";
import Post from "./Post/Post";
import { PostType } from "../../../redux/profile-reducer";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

type MyPostsType = {
  posts: Array<PostType>;
  addPost: (newPostText: string) => void;
};

export const MyPosts = React.memo((props: MyPostsType) => {
  console.log("render Mypost PC");
  let postElements = props.posts
    .map((p: PostType) => (
      <Post id={p.id} message={p.message} likesCount={p.likesCount} />
    ))
    .reverse();

  const onAddPost = (values: any) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <AddNewPostFormRedux onSubmit={onAddPost} />
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
});

const maxLength10 = maxLengthCreator(10);
const AddNewPostForm = (props: any) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        name="newPostText"
        placeholder="it-kamasutra"
        validate={[required, maxLength10]}
      />
      <button>Add post</button>
    </form>
  );
};
const AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(
  AddNewPostForm
);

export default MyPosts;
