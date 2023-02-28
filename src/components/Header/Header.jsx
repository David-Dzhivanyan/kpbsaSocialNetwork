import React from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.css'

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src='https://opelik417.github.io/CPBUA-landing-page/assets/icon.jpg' />
            <div> 
                { props.isAuth 
                ? <button className={s.login_btn} onClick={props.logout}>Logout</button> 
                : <NavLink to={'/login'}><button className={s.login_btn}>Login</button></NavLink>}
            </div>
        </header>
    );
}

export default Header;