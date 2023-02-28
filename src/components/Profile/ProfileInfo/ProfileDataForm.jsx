import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {FormControl} from "../../common/FormsControls/FormsControls"
import {textareaValidatorСreator} from "../../../utils/validators/validators.js"
import { Contacts } from "./ProfileInfo.jsx";
import s from "./ProfileInfo.module.css"

const ProfileDataForm = (props) =>{
    const textareaValidatorСreator15 = textareaValidatorСreator(15);
    const textareaValidatorСreator100 = textareaValidatorСreator(100);
    return (
        <div className={s.profile_info}>
            <Formik
                initialValues={{ fullName: props.profile.fullName, lookingForAJob: props.profile.lookingForAJob, lookingForAJobDescription: props.profile.lookingForAJobDescription, aboutMe: props.profile.aboutMe, contacts: {} }}
                onSubmit={(value,{ setStatus, }) =>{
                    props.saveProfile(value)
                    props.closeEditMode()
                    console.log(value)
                }}
            >
            {(props)=>(
                <Form onSubmit={props.handleSubmit}>
                    <label>full Name</label>
                    <Field
                        placeholder="fullName"
                        name="fullName"
                        component={FormControl}
                        inputname="input"
                        validate={textareaValidatorСreator15}
                    />
                    <label>Looking for a job:</label>
                    <Field
                        name="lookingForAJob"
                        type="checkbox"
                        component={FormControl}
                        inputname="input"
                    />
                    <label>looking For A Job Description:</label>
                    <Field
                        placeholder="looking For A Job Description"
                        name="lookingForAJobDescription"
                        component={FormControl}
                        inputname="input"
                        validate={textareaValidatorСreator100}
                    />
                    <label>about Me:</label>
                    <Field
                        placeholder="about Me"
                        name="aboutMe"
                        component={FormControl}
                        inputname="input"
                        validate={textareaValidatorСreator100}
                    />
                    <button type="submit">submit</button>
                </Form>
            )}

            </Formik>
        </div>
    )
  };

export default ProfileDataForm;