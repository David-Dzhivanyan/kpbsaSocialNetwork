import { profileAPI } from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';
const CHANGE_POST_TEXT = 'profile/CHANGE_POST_TEXT';

let initialState ={
    postData:[
        {id:1, text:'It`s my first post!', likesCount:8},
        {id:2, text:'hi, how are you?', likesCount:12},
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    if(action.type === ADD_POST){
        let newPost = {
            id: state.postData.length + 1,
            text: action.text,
            likesCount: 0,
        };
        return {
            ...state,
            postData: [...state.postData, newPost],
        };
    }
    else if(action.type === CHANGE_POST_TEXT){
        const newPost = state.postData.filter(e=> e.id === action.postId);
        const newPost1 = {
            id: action.postId,
            text: action.newPostText,
            likesCount: newPost.likesCount,
        }
        const newPostData = [...state.postData];
        newPostData[action.postId - 1] = newPost1;
        return {
            ...state,
            postData: [...newPostData],
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
export const changePostText = (postId, newPostText) => ({type: CHANGE_POST_TEXT, postId, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});


export const setUser = (id) => {
    return async (dispatch) => {
        let data = await profileAPI.setUser(id)
        console.log(data);
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

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        await profileAPI.saveProfile(profile)
        dispatch(setUser(userId));
    }
}

export default profileReducer;