import { ErrorMessage } from "formik"
import s from "./FormsControls.module.css"



export const FormControl = ({field, form,...props})=>{
    return(
        <div className={s.form_control + ' ' + ((form.errors[field.name] && form.touched[field.name]) ? s.error : "")}>
            <props.inputname  {...field} {...props}/>
            <br></br>
            <ErrorMessage name={field.name} component="span"/> 
        </div>
    )
}