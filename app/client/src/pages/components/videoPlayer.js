import React, { useState } from "react";
import { useAppContext } from "../../appContext";
import { Button } from 'react-bootstrap';
import '../home.css';

function VideoPlayer() {
    const { uploadedFiles } = useAppContext();
    const [file] = useState(uploadedFiles[0].file);
    return <>
                <video controls>
                    <source src={"http://localhost:8000/tmpvideo/"+file.name} type={file.type} />
                    <p>Votre navigateur ne prend pas en charge les vidéos HTML5.
                        Voici <a href="myVideo.mp4">un lien pour télécharger la vidéo</a>.</p>
                </video>
            </>
}

export default VideoPlayer;