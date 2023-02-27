import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {FormControl} from "../common/FormsControls/FormsControls.jsx"
import {textareaValidatorСreator} from "../../utils/validators/validators.js"
import { login } from "../../redux/auth-reducer.js";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import s from "../common/FormsControls/FormsControls.module.css"

const LoginForm = (props) =>{
    const inputValidatorML30 = textareaValidatorСreator(30);
    return(
        <div>
            <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            onSubmit={(value,{ setStatus }) =>{
                props.login(value.email, value.password, value.rememberMe, setStatus);
            }}
            >
            {(props) => (
                <Form onSubmit={props.handleSubmit}>
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
                        component={FormControl}
                        inputname="input"
                        validate={inputValidatorML30}
                    />
                    <label>Remember Me</label>
                    <Field 
                        name="rememberMe"
                        type="checkbox"
                        component={FormControl}
                        inputname="input"
                    />
                    <button type="submit">
                        Submit
                    </button>
                    {props.status && <div className={s.statusMessage}>{props.status.error}</div>}
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
        <div>
            <h1>login</h1>
            <LoginForm serverAnswer={props.serverAnswer} login={props.login} />
        </div>
    )
}

const mapStateToProps=(state)=>({
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps,{login})(Login);