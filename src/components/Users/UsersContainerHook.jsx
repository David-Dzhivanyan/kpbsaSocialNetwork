import { connect } from "react-redux";
import Users from "./Users.jsx";
import {
    follow, 
    unfollow, 
    setCurrentPage, 
    setTotalUsersCount, 
    toggleIsFollowingProgress,
    receiveUsers,
    followTC,
    unfollowTC
} from '../../redux/users-reducer.js'
import React, { useEffect } from "react";
import Preloager from "../common/preloader/preloader.jsx";
import { compose } from "redux";
import { getUsers, 
    getPageSize, 
    getTotalUsersCount, 
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress
} from "../../redux/users-selectors.js"

const UsersContainer = (props) => {
    
    useEffect(()=>{
        props.receiveUsers(props.currentPage, props.pageSize);
    },[]);

    const onPageChanged = (pageNumber) =>{
        props.setCurrentPage(pageNumber);
        props.receiveUsers(pageNumber, props.pageSize);
    }
    return (
        <>
    {props.isFetching 
    ? <Preloager />
    : null}
    <Users 
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        users={props.users}
        unfollow={props.unfollow}
        follow={props.follow}
        onPageChanged={onPageChanged}
        toggleIsFollowingProgress={props.toggleIsFollowingProgress}
        followingInProgress={props.followingInProgress}
        followTC={props.followTC}
        unfollowTC={props.unfollowTC}
    />
    </>
    )
};

let mapStateToProps = (state) =>{
    return{
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, 
        { toggleIsFollowingProgress, follow, unfollow, setCurrentPage,
        setTotalUsersCount, receiveUsers, followTC, unfollowTC })
)(UsersContainer)
