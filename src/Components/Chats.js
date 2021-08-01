import React, { useState, useEffect } from 'react'
import './Chats.css'
import SearchIcon from '@material-ui/icons/Search'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { Avatar } from '@material-ui/core'
import ChatInput from './ChatInput'
import db, { auth } from '../firebase'
import { selectUser } from '../features/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetCameraImage } from '../features/cameraSlice'

function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        db.collection('posts').orderBy("timestamp", "desc").onSnapshot((snapshot) =>
            setPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            )
        )
    }, []);
    const takeSnap = () => {
        dispatch(resetCameraImage())
        history.push("/")
    }

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar
                    src={user.profilePic}
                    onClick={() => auth.signOut()}
                    className="chats__avatar"
                />
                <div className="chats__search">
                    <SearchIcon className="chats__searchIcon" />
                    <input type="text" placeholder="friends" />
                </div>
                <ChatBubbleIcon className="chats__chatIcon" />
            </div>
            <div className="chats__posts">
                {posts.map(({ id, data: { username, timestamp, imageUrl, profilePic, read } }) => (
                    <ChatInput
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        profilePic={profilePic}
                        read={read}
                    />
                ))}
            </div>
            <RadioButtonUncheckedIcon
                className="chats__takePicIcon"
                onClick={takeSnap}
                fontSize="large"
            />
        </div>
    )
}

export default Chats
