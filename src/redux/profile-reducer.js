import { profileAPI } from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'

let initialState ={
    postData:[
        {id:1, text:'hi, how are you?', likesCount:12},
        {id:2, text:'It`s my first post!', likesCount:8},
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    if(action.type === ADD_POST){
        let newPost = {
            id: 5,
            text: action.text,
            likesCount: 0,
        };
        return {
            ...state,
            postData: [...state.postData, newPost],
        };
    }
    else if(action.type === SET_USER_PROFILE){
        return{
            ...state,
            profile: action.profile
        }
    }
    else if(action.type === SET_STATUS){
        return{
            ...state,
            status: action.status
        }
    }
    else if(action.type === SAVE_PHOTO_SUCCESS){
        return{
            ...state,
            profile:{...state.profile, photos: action.photos}
        }
    }
    return state;
}

export const addPost = (text) =>({type: ADD_POST, text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const setUser = (id) => {
    return async (dispatch) => {
        let data = await profileAPI.setUser(id)

        dispatch(setUserProfile(data));
    }
}

export const receiveStatus = (id) => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(id)

        dispatch(setStatus(data));
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        let data = await profileAPI.updateStatus(status)

        if(data.resultCode === 0){
            dispatch(setStatus(status));
        }
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
        let data = await profileAPI.savePhoto(file)

        if(data.resultCode === 0){
            dispatch(savePhotoSuccess(data.data.photos));
        }
    }
}

export default profileReducer;