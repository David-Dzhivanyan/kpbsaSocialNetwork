import React, { useEffect, useState } from "react";
import s from './ProfileInfo.module.css';

const ProfileStatus = (props) =>{

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }

    const onStatusChange = (e) =>{
        setStatus(e.currentTarget.value)
    }

    useEffect(()=>{
        setStatus(props.status)
    },[props.status]);

    return(
        <div>
            {!editMode &&
                <div>
                <b>status:</b> <span onDoubleClick={activateEditMode}>{props.status || 'status is undefined'}</span>
                </div>
            }
            {editMode && 
                <div>
                <b>status:</b><input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div>
            }
        </div>
        
    )
}

export default ProfileStatus;