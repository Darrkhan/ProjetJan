import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../home.css';
import VideoPlayer from '../components/videoPlayer';

function LoadingButton() {
    const [reload, setReload] = useState(0);
    if(reload===0){
        return <><Button 
                    id='validate-button' 
                    className="btn btn-success btn-lg"
                    type='button'
                    onClick={ () => { setReload(1); }}
                >
                    Load Video
                </Button></>;
    }
    return <>
            <VideoPlayer />
        </>
}

export default LoadingButton;