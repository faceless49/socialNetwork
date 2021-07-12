import React from 'react';
import {PostType} from '../../../../redux/store';
import s from './Post.module.scss';

const Post = (props: PostType) => {

  return (
    <div className={s.item}>
      <img src="https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg"/>
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  )
}

export default Post;
