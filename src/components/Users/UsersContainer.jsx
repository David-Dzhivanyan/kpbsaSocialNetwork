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
import React from "react";
import Preloager from "../common/preloader/preloader.jsx";
import { compose } from "redux";
import { getUsers, 
    getPageSize, 
    getTotalUsersCount, 
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress
} from "../../redux/users-selectors.js"

class UsersContainer extends React.Component {
    componentDidMount(){
        this.props.receiveUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (pageNumber) =>{
        this.props.setCurrentPage(pageNumber);
        this.props.receiveUsers(pageNumber, this.props.pageSize);
    }
    render(){
        return <>
        {this.props.isFetching 
        ? <Preloager />
        : null}
        <Users 
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            onPageChanged={this.onPageChanged}
            toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
            followingInProgress={this.props.followingInProgress}
            followTC={this.props.followTC}
            unfollowTC={this.props.unfollowTC}
        />
        </>
    }

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
