import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import { Field, Form, Formik, ErrorMessage } from "formik";
import {textareaValidatorСreator} from "../../../utils/validators/validators.js"
import {FormControl} from "../../common/FormsControls/FormsControls.jsx"

const AddPostForm = (props) =>{
  const validatorMaxLength20 = textareaValidatorСreator(20)
  return(
      <Formik
          initialValues={{ text: '',}}
          onSubmit={(value)=>props.addPost(value.text)}
      >
          {props=>(
              <Form 
                onSubmit={props.handleSubmit}
                className={s.new_post_form}
              >
                  <Field
                      name={"text"}
                      component={FormControl}
                      validate={validatorMaxLength20}
                      inputname="textarea"
                      className={s.textarea}
                  />
                  <button className={s.add_post_btn}  type="submit">Publish</button>
              </Form>
          )}
      </Formik>
  )
}

const MyPosts = (props) => {
  let postElements = props.postData
    .map(p=> <Post isOwner={props.isOwner} changePostText={props.changePostText} key={p.id} id={p.id} profile={props.profile} text={p.text} />);

  return (
    <div className={s.post_container}>
      {props.isOwner && <div>
        <h4 className={s.new_post_title}> New post</h4>
        <AddPostForm addPost={props.addPost}/>
      </div>}
      <h3 className={s.new_post_title}> Posts </h3>
      <div className={s.posts_wrapper}> 
        {
          postElements
        }
      </div>
    </div>
  );
}

export default MyPosts;