import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {FormControl} from "../../common/FormsControls/FormsControls"
import {textareaValidatorСreator} from "../../../utils/validators/validators.js"
import s from "./ProfileInfo.module.css"

const ProfileDataForm = (props) =>{
    const textareaValidatorСreator20 = textareaValidatorСreator(20);
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
                    <label htmlFor="fullName" className={s.text_bold}>Full name:</label>
                    <Field
                        id="fullName"
                        placeholder="fullName"
                        name="fullName"
                        component={FormControl}
                        inputname="input"
                        validate={textareaValidatorСreator20}
                    />
                    <label htmlFor="lookingForAJob" className={s.text_bold}>Looking for a job:</label>
                    <Field
                        name="lookingForAJob"
                        type="checkbox"
                        component={FormControl}
                        inputname="input"
                    />
                    <label htmlFor="lookingForAJobDescription" className={s.text_bold}>My professional skills:</label>
                    <Field
                        placeholder="looking For A Job Description"
                        name="lookingForAJobDescription"
                        component={FormControl}
                        inputname="textarea"
                        validate={textareaValidatorСreator100}
                    />
                    <label htmlFor="aboutMe" className={s.text_bold}>About me:</label>
                    <Field
                        placeholder="about Me"
                        name="aboutMe"
                        component={FormControl}
                        inputname="textarea"
                        validate={textareaValidatorСreator100}
                    />
                    <button className={s.edit_mode_btn} type="submit">Submit</button>
                </Form>
            )}

            </Formik>
        </div>
    )
  };

export default ProfileDataForm;