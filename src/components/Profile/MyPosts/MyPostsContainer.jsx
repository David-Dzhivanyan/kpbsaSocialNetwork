import MyPosts from "./MyPosts.jsx";
import {addPost,} from '../../../redux/profile-reducer.js';
import { connect } from "react-redux";
import {getPostData} from "../../../redux/profile-selectors"

let mapStateToProps = (state) =>{
  return{
    postData: getPostData(state),
  }
}

export default connect(mapStateToProps, {addPost,})(MyPosts);