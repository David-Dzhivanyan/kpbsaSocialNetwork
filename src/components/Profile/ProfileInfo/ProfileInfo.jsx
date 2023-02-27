import React from "react";
import Preloader from "../../common/preloader/preloader";
import ProfileStatus from "./ProfileStatusHook"
import s from "./ProfileInfo.module.css"

const ProfileInfo = (props) => {
  if(!props.profile){
    return <Preloader />
  }
  let imgSrc = props.profile.photos.large ? props.profile.photos.large : 'https://pp.userapi.com/c840729/v840729427/8a1ca/GO_-t2wviMY.jpg'

  return(
    <div className={s.content}>
      <img className={s.avatar} src={imgSrc}/>
      <span><ProfileStatus status={props.status} updateStatus={props.updateStatus}/></span>
      <span>{props.profile.fullName}</span>
    </div>
  );
}

export default ProfileInfo;