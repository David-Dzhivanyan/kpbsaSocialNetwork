import React from "react";
import Profile from "./Profile.jsx"
import { connect } from "react-redux";
import { setUser, receiveStatus, updateStatus} from "../../redux/profile-reducer";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.js";
import { compose } from "redux";
import { Navigate } from "react-router-dom";
import {getProfile, getStatus} from "../../redux/profile-selectors"
import {getUserId, getIsAuth} from "../../redux/auth-selectors"

class ProfileContainer extends React.Component{
  componentDidMount(){
    let userId;
    if(this.props.router.params.userId){
      console.log('1')
      userId = this.props.router.params.userId;
    }
    else {
      userId = this.props.authorizedUserId;
    }
    this.props.setUser(userId);
    this.props.receiveStatus(userId);
  }

  render(){
    let userId;
    if(this.props.router.params.userId){
      userId = this.props.router.params.userId;
    }
    else {
      userId = this.props.authorizedUserId;
      if(!userId) return <Navigate to="/login" />
    }
    return (

      <Profile {...this.props} />
    );
  }
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
  connect(mapStateToProps,{setUser, receiveStatus, updateStatus}),
  withRouter,
  //withAuthRedirect,
)(ProfileContainer)