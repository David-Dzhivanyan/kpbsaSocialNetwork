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
      <img className={s.avatar} src={imgSrc}/>
      <div>
        <span><ProfileStatus status={props.status} updateStatus={props.updateStatus}/></span>
        {props.isOwner && <input className={s.upload_avatar} type={"file"} onChange={onMainPhotoSelected}></input>}
      </div>
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
  );
}

const ProfileData = (props) =>{
  return (
    <div className={s.profile_info}>
      {props.isOwner && <button onClick={props.goToEditMode}>edit</button>}
      <div>
        <span>{props.profile.fullName}</span>
      </div>
      <div>
      
      </div>
      <div>
        <b>Looking for a job: </b><span>{props.profile.lookingForAJob ? "yes" : "no"}</span>
      </div>
      {props.profile.lookingForAJob && 
        <div>
          <b>My professional skills: </b><span>{props.profile.lookingForAJobDescription}</span>
        </div>
      }
      <div>
        <b>About me: </b><span>{props.profile.aboutMe}</span>
      </div>
    </div>
  )
}

export default ProfileInfo;