import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState ={
    users:[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    if(action.type === FOLLOW){
        return{
            ...state,
            users: updateObjectInArray(state.users, action.userId, "id",{followed: true})
        }
    }
    else if(action.type === UNFOLLOW){
        return{
            ...state,
            users: updateObjectInArray(state.users, action.userId, "id",{followed: false})
        }
    }
    else if(action.type === SET_USERS){
        return{
            ...state,
            users: action.users,
        }

    }
    else if(action.type === SET_CURRENT_PAGE){
        return{
            ...state,
            currentPage: action.currentPage,
        }
    }
    else if(action.type === SET_TOTAL_USERS_COUNT){
        return{
            ...state,
            totalUsersCount: action.totalCount
        }
    }
    else if(action.type === TOGGLE_IS_FETCHING){
        return{
            ...state,
            isFetching: action.isFetching,
        }
    }
    else if(action.type === TOGGLE_IS_FOLLOWING_PROGRESS){
        return{
            ...state,
            followingInProgress: action.isFetching 
            ? [...state.followingInProgress, action.userId]
            : state.followingInProgress.filter(id => id !== action.userId)
        }
    }
    return state;
}

export const follow = (userId) =>({type: FOLLOW, userId});
export const unfollow = (userId) =>({type: UNFOLLOW, userId});
export const setUsers = (users) =>({type: SET_USERS, users});
export const setCurrentPage =(currentPage) =>({type:SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching});
export const toggleIsFollowingProgress = (isFetching, userId) => ({type:TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const receiveUsers = (currentPage, pageSize) =>{
    return async (dispatch) =>{
        dispatch(toggleIsFetching(true));

        let data = await usersAPI.getUsers(currentPage, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(setUsers(data.items));
    }
}

const followUnfollowFlow = async (dispatch, id, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingProgress(true, id));

    let data = await apiMethod(id)

    if(data.resultCode === 0){
        dispatch(actionCreator(id));
    }

    dispatch(toggleIsFollowingProgress(false, id));
}

export const followTC = (id) =>{
    return async (dispatch) =>{
        followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), follow)
    }
}
export const unfollowTC = (id) =>{
    return async (dispatch) =>{

        followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), unfollow)
    }
}

export default usersReducer;