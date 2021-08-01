import { Avatar } from '@material-ui/core'
import React from 'react'
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import './ChatInput.css'
import { useDispatch } from 'react-redux'
import { selectImage } from '../features/appSlice'
import ReactTimeago from 'react-timeago'
import db from '../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/appSlice'
import { useHistory } from 'react-router'

function ChatInput({ id, username, profilePic, timestamp, imageUrl, read }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(selectUser)

    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set(
                {
                    read: true
                },
                { merge: true })
            history.push('/chatInput/view')
        }
    }

    return (
        <div onClick={open} className="chatInput">
            <Avatar className="chatInput__avatar" src={user.profilePic} />
            <div className="chatInput__info">
                <h4>{username}</h4>
                <p>
                    {!read && "Tap To View -"}{""}
                    < ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
            </div>
            {!read && <StopRoundedIcon className="chatInput__readIcon" />}
        </div>
    )
}

export default ChatInput
