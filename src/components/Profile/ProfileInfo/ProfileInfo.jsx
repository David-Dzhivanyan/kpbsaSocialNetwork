import React from "react";
import Preloader from "../../common/preloader/preloader";
import ProfileStatus from "./ProfileStatusHook"
import s from "./ProfileInfo.module.css"

const ProfileInfo = (props) => {
  if(!props.profile){
    return <Preloader />
  }

  const onMainPhotoSelected = (e) =>{
    if(e.target.files.length === 1){
      props.savePhoto(e.target.files[0])
    } 

  }

  let imgSrc = props.profile.photos.large ? props.profile.photos.large : 'https://pp.userapi.com/c840729/v840729427/8a1ca/GO_-t2wviMY.jpg';
  return(
    <div className={s.content}>
      <img className={s.avatar} src={imgSrc}/>
      {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}></input>}
      <span><ProfileStatus status={props.status} updateStatus={props.updateStatus}/></span>
      <span>{props.profile.fullName}</span>
    </div>
  );
}

export default ProfileInfo;