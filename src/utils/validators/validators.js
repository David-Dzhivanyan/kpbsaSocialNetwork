export const textareaValidatorСreator = (maxLength) => value =>{
    let error;
    if(!value) {
        error = "Field is required";
    }
    else if(value.length > maxLength){
        error = `Max length ${maxLength} symbols`;
    }
    return error;
}
