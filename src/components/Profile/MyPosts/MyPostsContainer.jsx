import MyPosts from "./MyPosts.jsx";
import {addPost, changePostText} from '../../../redux/profile-reducer.js';
import { connect } from "react-redux";
import {getPostData, getProfile} from "../../../redux/profile-selectors"

let mapStateToProps = (state) =>{
  return{
    postData: getPostData(state),
    profile: getProfile(state)
  }
}

export default connect(mapStateToProps, {addPost, changePostText})(MyPosts);