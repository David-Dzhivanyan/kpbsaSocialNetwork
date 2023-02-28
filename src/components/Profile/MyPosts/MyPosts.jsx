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
                  />
                  <button  type="submit">Опубликовать</button>
              </Form>
          )}
      </Formik>
  )
}

const MyPosts = (props) => {
  let postElements = props.postData
    .map(p=> <Post key={p.id} profile={props.profile} text={p.text} />);

  return (
    <div className={s.posts}>
      <div>
        <h4> New post</h4>
        <AddPostForm addPost={props.addPost}/>
      </div>
      <h3> My post </h3>
      {
        postElements
      }
    </div>
  );
}

export default MyPosts;