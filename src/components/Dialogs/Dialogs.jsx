import React from "react";
import s from './Dialogs.module.css';
import Message from "./Message/Message.jsx";
import DialogItem from "./DialogItem/DialogItem.jsx";
import { Field, Form, Formik } from "formik";
import {textareaValidatorСreator} from "../../utils/validators/validators.js"
import { FormControl } from "../common/FormsControls/FormsControls";

const AddMessageForm = (props) =>{
    let validatorMaxLength100 = textareaValidatorСreator(100)
    return(
        <Formik
            initialValues={{ message: '',}}
            onSubmit={(value)=>props.sendMessage(value.message)}
        >
            {(form)=>(
                <Form 
                    onSubmit={form.handleSubmit}
                    className={s.send_message}
                >
                    <Field
                        name={"message"}
                        component={FormControl}
                        validate={validatorMaxLength100}
                        inputname="textarea"
                    />
                    <button type="submit">Send message</button>
                </Form>
            )}
        </Formik>
    )
}


const Dialogs = (props) =>{
    let dialogsElements=props.dialogsData
        .map(d => <DialogItem key={d.id} id={d.id} name={d.name} />);
    let messagesElements=props.messagesData
        .map(m => <Message key={m.id} message={m.message}/>);


    return(
        <div className={s.content}>
            <div className={s.dialogs_items}>
                {
                    dialogsElements
                }
            </div>
            <div className={s.messages_wrapper}>
                <div className={s.messages}>
                    {
                        messagesElements
                    }
                </div>
                <AddMessageForm sendMessage={props.sendMessage} />
            </div>
            
        </div>
    )
}

export default Dialogs;