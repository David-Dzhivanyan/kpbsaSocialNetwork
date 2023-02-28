import React from "react";
import s from "./Profile.module.css"
import MyPostsContainer from "./MyPosts/MyPostsContainer.jsx"
import ProfileInfo from "./ProfileInfo/ProfileInfo.jsx"
import Preloader from "../common/preloader/preloader";

const Profile = (props) => {
    if(!props.profile){
      return <Preloader />
    }

    return (
      <div className={s.content}>
        <div className={s.img_wrapper}>
          <img src='https://opelik417.github.io/CPBUA-landing-page/assets/logo-light.png'/>
        </div>
        <ProfileInfo 
          profile={props.profile} 
          status={props.status} 
          updateStatus={props.updateStatus}
          isOwner={props.isOwner}
          savePhoto={props.savePhoto}
          />
        <MyPostsContainer />
      </div>
    );
};

export default Profile;