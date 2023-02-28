import React from "react";
import { NavLink } from "react-router-dom";
import s from '../Users.module.css';

let User = (props) => {

    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + props.id}>
                    <img className={s.avatar}
                        src={props.photo != null 
                        ? props.photo
                        : 'https://pp.userapi.com/c840729/v840729427/8a1ca/GO_-t2wviMY.jpg'}
                    />
                    </NavLink>
                </div>
                <div>
                    {props.followed 
                        ? <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {
                            props.unfollowTC(props.id);

                        } }>Unfollow</button> 
                        : <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {
                            props.followTC(props.id);

                        } }>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{props.name}</div>
                    <div>{props.status}</div>
                </span>
                <span>
                    <br />
                </span>
            </span>
        </div>
    )
};

    export default User;