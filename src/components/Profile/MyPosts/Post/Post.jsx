import React from "react";
import s from './Post.module.css'

const Post = (props) => {
    return (
      <div className={s.item}>
        <img className={s.author_photo} src="https://pp.userapi.com/c840729/v840729427/8a1ca/GO_-t2wviMY.jpg" />
        <div className={s.post_text}>{props.text}</div>
      </div>
    );
}

export default Post;