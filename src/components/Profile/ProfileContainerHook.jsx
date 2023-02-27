import React, { useEffect, useState } from "react";
import Profile from "./Profile.jsx"
import { connect } from "react-redux";
import { setUser, receiveStatus, updateStatus, savePhoto} from "../../redux/profile-reducer";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.js";
import { compose } from "redux";
import { Navigate } from "react-router-dom";
import {getProfile, getStatus,} from "../../redux/profile-selectors"
import {getUserId, getIsAuth} from "../../redux/auth-selectors"

const ProfileContainer = (props) => {

  const setUserId = () => {
    let userId;
    if(props.router.params.userId){
      userId = props.router.params.userId;
    }
    else {
      userId = props.authorizedUserId;
    }
    return userId
  }

  useEffect(()=>{
    let userId = setUserId();
    props.setUser(userId);
    props.receiveStatus(userId);
  },[props.router.params.userId])

  let userId = setUserId();
  if(!userId) return <Navigate to="/login" />

  return (

    <Profile {...props}
      isOwner={!props.router.params.userId}
      />
  );
};


let mapStateToProps = (state) =>({
  profile: getProfile(state),
  status: getStatus(state),
  authorizedUserId: getUserId(state),
  isAuth: getIsAuth(state)
})

function withRouter(Component){
  function ComponentWithRouterProp(props){
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{location, navigate, params }} />
  }
  return ComponentWithRouterProp;
}

export default compose(
  connect(mapStateToProps,{setUser, receiveStatus, updateStatus, savePhoto}),
  withRouter,
  //withAuthRedirect,
)(ProfileContainer)