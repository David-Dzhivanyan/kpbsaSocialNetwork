import React, { useState } from "react";
import ProfileStatus from "./ProfileStatusHook"
import ProfileDataForm from "./ProfileDataForm";
import s from "./ProfileInfo.module.css"

const ProfileInfo = (props) => {
  const [editMode, setEditMode] = useState(false)
  
  const onMainPhotoSelected = (e) =>{
    if(e.target.files.length === 1){
      props.savePhoto(e.target.files[0])
    } 

  }

  let imgSrc = props.profile.photos.large || 'https://pp.userapi.com/c840729/v840729427/8a1ca/GO_-t2wviMY.jpg';
  return(
    <div className={s.content}>
      <div className={s.avatar_wrapper}>
        <img className={s.avatar} src={imgSrc}/>
        {props.isOwner 
        ? <div>
          <label className={s.upload_avatar} htmlFor="uploadAvatar">Change avatar</label>
          <input id="uploadAvatar" className={s.upload_avatar_input} type={"file"} onChange={onMainPhotoSelected}></input>
        </div> 
        : <div></div>}
      </div>
      <div>
        <span><ProfileStatus isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/></span>
        {editMode 
        ? <ProfileDataForm 
          profile={props.profile} 
          isOwner={props.isOwner}
          closeEditMode={()=>setEditMode(false)}
          saveProfile={props.saveProfile}
        /> 
        : <ProfileData
          goToEditMode={()=>setEditMode(true)}
          isOwner={props.isOwner}
          profile={props.profile} 
        />
        }
      </div>
    </div>
  );
}

const ProfileData = (props) =>{
  return (
    <div className={s.profile_info}>
      <div>
        <span className={s.text_bold}>{props.profile.fullName}</span>
      </div>
      <div>
        <b className={s.text_bold}>Looking for a job: </b><span>{props.profile.lookingForAJob ? "yes" : "no"}</span>
      </div>
      {props.profile.lookingForAJob && 
        <div>
          <b className={s.text_bold}>My professional skills: </b><span>{props.profile.lookingForAJobDescription}</span>
        </div>
      }
      <div>
        <b className={s.text_bold}>About me: </b><span>{props.profile.aboutMe}</span>
      </div>
      {props.isOwner && <button className={s.edit_mode_btn} onClick={props.goToEditMode}>Edit</button>}
    </div>
  )
}

export default ProfileInfo;