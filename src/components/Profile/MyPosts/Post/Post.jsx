import React, { useState } from "react";
import s from './Post.module.css'
import { Field, Form, Formik, ErrorMessage } from "formik";
import {textareaValidatorСreator} from "../../../../utils/validators/validators.js"
import {FormControl} from "../../../common/FormsControls/FormsControls.jsx"


const ChangePostForm = (props) =>{
  const validatorMaxLength20 = textareaValidatorСreator(20)
  return(
      <Formik
          initialValues={{ text: props.text,}}
          onSubmit={(value)=>{
            props.changePostText(props.id, value.text)
            props.setEditPostMode(false);
          }}
      >
          {props=>(
              <Form 
                onSubmit={props.handleSubmit}
                className={s.change_post_form}
              >
                  <Field
                      name={"text"}
                      component={FormControl}
                      validate={validatorMaxLength20}
                      inputname="textarea"
                      className={s.textarea}
                  />
                  <button className={s.change_post_btn}  type="submit">Submit</button>
              </Form>
          )}
      </Formik>
  )
}

const Post = (props) => {
    const [editPostMode, setEditPostMode] = useState(false);

    return (
      <div className={s.post}>
        <div className={s.post_header}>
          <div className={s.post_author}>
            <img className={s.author_photo} src={props.profile.photos.large || "https://pp.userapi.com/c840729/v840729427/8a1ca/GO_-t2wviMY.jpg"} />
            <span className={s.author_name}>{props.profile.fullName}</span>
          </div>
          {!editPostMode && props.isOwner && <button onClick={() => setEditPostMode(true)} className={s.change_post_btn}>Change</button>}
        </div>
        {editPostMode 
        ? <ChangePostForm setEditPostMode={setEditPostMode} id={props.id} changePostText={props.changePostText} text={props.text} />
        : <div className={s.post_text}>{props.text}</div>}
      </div>
    );
}

export default Post;