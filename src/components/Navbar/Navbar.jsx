import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css';

const Navbar = () =>{
    return(      
    <nav className={s.nav}>
      <NavLink to="/profile" className={navData => navData.isActive ? `${s.active} ${s.item}` : s.item}>Profile</NavLink>
      <NavLink to="/dialogs" className={navData => navData.isActive ? `${s.active} ${s.item}` : s.item}>Messages</NavLink>
      <NavLink to="/users" className={navData => navData.isActive ? `${s.active} ${s.item}` : s.item}>Users</NavLink>
      <NavLink to="/news" className={navData => navData.isActive ? `${s.active} ${s.item}` : s.item}>News</NavLink>
      <NavLink to="/music" className={navData => navData.isActive ? `${s.active} ${s.item}` : s.item}>Music</NavLink>
      <NavLink to="/settings" className={navData => navData.isActive ? `${s.active} ${s.item}` : s.item}>Settings</NavLink>
    </nav>);
}

export default Navbar;