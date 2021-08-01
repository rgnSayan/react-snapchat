import React, { useRef, useCallback } from 'react'
import './WebCamCapture.css'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { setCameraImage } from '../features/cameraSlice';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
}

function WebCamCapture() {
    const webcamRef = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()

    const capture = useCallback(() => {
        const imgSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imgSrc));
        history.push('/preview')
    }, [webcamRef])

    return (
        <div className="webcamCapture">
            <Webcam
                audio={false} height={videoConstraints.height} ref={webcamRef}
                width={videoConstraints.width} videoConstraints={videoConstraints}
            />
            <RadioButtonUncheckedIcon
                className="webcamCapture__button"
                onClick={capture}
                fontSize="large"
            />
        </div>
    )
}
export default WebCamCapture
