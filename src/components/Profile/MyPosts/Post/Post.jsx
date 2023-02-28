import React from "react";
import s from './Post.module.css'

const Post = (props) => {

    return (
      <div className={s.item}>
        <div className={s.post_header}>
          <img className={s.author_photo} src={props.profile.photos.large || "https://pp.userapi.com/c840729/v840729427/8a1ca/GO_-t2wviMY.jpg"} />
          <span>{props.profile.fullName}</span>
        </div>
        <div className={s.post_text}>{props.text}</div>
      </div>
    );
}

export default Post;