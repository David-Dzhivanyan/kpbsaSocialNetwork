import { authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'auth/TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

let initialState ={
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
    if(action.type === SET_USER_DATA){
        return{
            ...state,
            ...action.data,
        }
    }
    else if(action.type === TOGGLE_IS_FETCHING){
        return{
            ...state,
            isFetching: action.isFetching,
        }
    }
    else if(action.type === GET_CAPTCHA_URL_SUCCESS){

        return{
            
            ...state,
            captchaUrl: action.captchaUrl,
        }
    }
    return state;
}

export const setUserData = (userId, email, login, isAuth) => ({type:SET_USER_DATA, data:{userId, email, login, isAuth}})
export const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching});
export const getCaptchaUrlSuccess = (captchaUrl) => ({type:GET_CAPTCHA_URL_SUCCESS, captchaUrl});

export const authData = () =>{ 
        return async (dispatch) =>{
        let data = await authAPI.getMe()

        if(data.resultCode === 0){
            let {id, login, email} = data.data;
            dispatch(setUserData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe, captcha, setStatus) => {
    return async (dispatch) =>{
        let data = await authAPI.login(email, password, rememberMe, captcha);

        if(data.resultCode === 0){
            dispatch(authData());
        }
        else if(data.resultCode === 10){
            dispatch(getCaptchaUrl(setStatus));
        }
        else{
            setStatus({error: data.messages[0]})
        }
    }
}

export const getCaptchaUrl = (setStatus) => {
    return async (dispatch) =>{
        let data = await securityAPI.getCaptchaUrl();
        const captcha = data.url;
        dispatch(getCaptchaUrlSuccess(captcha));
        setStatus({captcha})
    }
}

export const logout = () => {
    return async (dispatch) =>{
        let data = await authAPI.logout()

        if(data.resultCode === 0){
            dispatch(setUserData(null, null, null, false));
        }
    }
}


export default authReducer;