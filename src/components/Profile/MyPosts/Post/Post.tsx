import React, { FC } from "react";
import s from "./Post.module.scss";
import { PostType } from "../../../../redux/profile-reducer";

const Post: FC<PostType> = ({ message, likesCount }) => {
  return (
    <div className={s.item}>
      <img src="https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg" />
      {message}
      <div>
        <span>like</span> {likesCount}
      </div>
    </div>
  );
};

export default Post;
