import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {FormControl} from "../common/FormsControls/FormsControls.jsx"
import {textareaValidatorСreator} from "../../utils/validators/validators.js"
import { login } from "../../redux/auth-reducer.js";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import FormStyles from "../common/FormsControls/FormsControls.module.css"
import {getCaptchaUrl, getIsAuth} from "../../redux/auth-selectors"
import s from "./Login.module.css"

const LoginForm = (props) =>{
    const inputValidatorML30 = textareaValidatorСreator(30);
    return(
        <div >
            <Formik
            initialValues={{ email: '', password: '', rememberMe: false, captcha: '' }}
            onSubmit={(value,{ setStatus,}) =>{
                props.login(value.email, value.password, value.rememberMe, value.captcha, setStatus);
            }}
            >
            {(props) => (
                <Form className={s.formik} onSubmit={props.handleSubmit}>
                    <Field
                        placeholder="email"
                        name="email"
                        component={FormControl}
                        inputname="input"
                        validate={inputValidatorML30}
                    />
                    <Field
                        placeholder="password"
                        name="password"
                        type="password"
                        component={FormControl}
                        inputname="input"
                        validate={inputValidatorML30}
                    />
                    <div className={s.remember_me}>
                        <label htmlFor="rememberMe"> Remember Me </label>
                        <Field
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                            component={FormControl}
                            inputname="input"
                        />
                    </div>
                    {props.status && props.status.captcha && <div className={s.captcha}>
                            <img src={props.status.captcha}/>
                            <label className={s.label_captcha} htmlFor="captcha">Enter captcha:</label>
                            <Field
                                id="captcha"
                                name="captcha"
                                component={FormControl}
                                inputname="input"
                                validate={inputValidatorML30}
                            />
                        </div>}
                    <button className={s.submit_btn} type="submit">
                        Submit
                    </button>
                    {props.status && <div className={FormStyles.statusMessage}>{props.status.error}</div>}
                </Form>
            )}
            </Formik>
      </div>
    )
}

const Login = (props) =>{
    if(props.isAuth){
        return <Navigate to={"/profile"} />
    }
    return(
        <div className={s.form_wrapper}>
            <h1 className={s.title}>Login</h1>
            <LoginForm captchaUrl={props.captchaUrl} login={props.login} />
        </div>
    )
}

const mapStateToProps=(state)=>({
    isAuth: getIsAuth(state),
    captchaUrl: getCaptchaUrl(state)
})

export default connect(mapStateToProps,{login})(Login);