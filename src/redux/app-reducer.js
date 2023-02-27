import { authData } from "./auth-reducer";

const SET_INITIALIZED = 'app/SET_INITIALIZED';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) =>{
    if(action.type === SET_INITIALIZED){
        return{
            ...state,
            initialized: true
        }
    }
    return state;
}

export const setInitialized = () =>({type: SET_INITIALIZED});

export const initializeApp = () => (dispatch) =>{
    let promise = dispatch(authData());

    Promise.all([promise]).then(()=>{
        dispatch(setInitialized())
    })
}

export default appReducer;