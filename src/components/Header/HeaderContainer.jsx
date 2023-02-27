import React from "react";
import Header from "./Header";
import { logout } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import { getIsAuth, getLogin } from "../../redux/auth-selectors";

const HeaderContainer = (props) =>{

    return <Header isAuth={props.isAuth} login={props.login} logout={props.logout} />
}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    login: getLogin(state),
})

export default connect(mapStateToProps,{logout})(HeaderContainer);