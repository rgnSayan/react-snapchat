import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../features/appSlice'
import './Login.css'

function Login() {
    const dispatch = useDispatch()
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch(login({
                    username: result.user.displayName,
                    profilePic: result.user.photoURL,
                    id: result.user.uuid,
                }))
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://play-lh.googleusercontent.com/KxeSAjPTKliCErbivNiXrd6cTwfbqUJcbSRPe_IBVK_YmwckfMRS1VIHz-5cgT09yMo" alt="" />
            </div>
            <Button variant="contained" color="secondary" onClick={signIn}>Sign in</Button>
        </div>
    )
}

export default Login
