import React from "react";
import { NavLink } from "react-router-dom";
import s from '../Users.module.css';

let User = (props) => {

    return (
        <div className={s.user}>
            <div className={s.user_header}>
                <div>
                    <NavLink to={'/profile/' + props.id}>
                    <img className={s.avatar}
                        src={props.photo != null 
                        ? props.photo
                        : 'https://pp.userapi.com/c840729/v840729427/8a1ca/GO_-t2wviMY.jpg'}
                    />
                    </NavLink>
                </div>
                <div className={s.user_info}>
                    <NavLink className={s.user_info_link} to={'/profile/' + props.id}>
                        <div>{props.name}</div>
                        <div>{props.status}</div>
                    </NavLink>
                </div>
            </div>
            <div>
                <div>
                    {props.followed 
                        ? <button className={s.follow_btn} disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {
                            props.unfollowTC(props.id);

                        } }>Unfollow</button> 
                        : <button className={s.follow_btn} disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {
                            props.followTC(props.id);

                        } }>Follow</button>}
                </div>
            </div>
        </div>
    )
};

    export default User;