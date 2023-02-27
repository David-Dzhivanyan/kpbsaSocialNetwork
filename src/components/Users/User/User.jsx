import React from "react";
import { NavLink } from "react-router-dom";
import s from '../Users.module.css';

let User = (props) => {

    return (
        <div>
                <br/>
                {
                props.users.map(u => 
                <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img className={s.avatar}
                                src={u.photos.small != null 
                                ? u.photos.small 
                                : 'https://pp.userapi.com/c840729/v840729427/8a1ca/GO_-t2wviMY.jpg'}
                            />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed 
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unfollowTC(u.id);

                                } }>Unfollow</button> 
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.followTC(u.id);

                                } }>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <br />
                        </span>
                    </span>
                </div>
                )}
        </div>
    )};

    export default User;