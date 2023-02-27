import { authAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'auth/TOGGLE_IS_FETCHING';

let initialState ={
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
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
    return state;
}

export const setUserData = (userId, email, login, isAuth) => ({type:SET_USER_DATA, data:{userId, email, login, isAuth}})
export const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching});

export const authData = () =>{ 
        return async (dispatch) =>{
        let data = await authAPI.getMe()

        if(data.resultCode === 0){
            let {id, login, email} = data.data;
            dispatch(setUserData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe, setStatus) => {
    return async (dispatch) =>{
        let data = await authAPI.login(email, password, rememberMe);

        if(data.resultCode === 0){
            dispatch(authData());
        }else{
            setStatus({error: data.messages[0]})
        }
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