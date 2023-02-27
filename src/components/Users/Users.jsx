import React from "react";
import { NavLink } from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import s from './Users.module.css';

let Users = (props) => {

    return (
        <div>
            <Paginator 
                totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                portionSize={10}
            />
            <User {...props} />
        </div>
    )};

export default Users;