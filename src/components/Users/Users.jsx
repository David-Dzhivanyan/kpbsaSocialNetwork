import React from "react";
import { NavLink } from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import s from './Users.module.css';

let Users = (props) => {
    let users = props.users.map(u => <User
        key={u.id} 
        id={u.id} 
        photo={u.photos.small} 
        followed={u.followed}
        unfollowTC={props.unfollowTC}
        followTC={props.followTC}
        name={u.name}
        status={u.status}
        followingInProgress={props.followingInProgress}
    />)
    return (
        <div>
            <Paginator 
                totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                portionSize={10}
            />
            {
                users
            }
        </div>
    )};

export default Users;