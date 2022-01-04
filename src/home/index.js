import React from 'react';
import { Button } from 'react-bootstrap';
import './index.css';
import browse_logo from '../assets/browse.png';
import { Dropzone, FileItem, VideoPreview } from "@dropzone-ui/react";
import { Fragment, useState } from "react";

function Home() {
    const [files, setFiles] = useState([]);

  const [videoSrc, setVideoSrc] = useState(undefined);
  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleWatch = (vidSrc) => {
    console.log("handleWatch", vidSrc);
    setVideoSrc(vidSrc);
  };
    return (
        <div id='popup'>
            <div id='popup-content'>
                <div id='buttons-div' className="d-flex justify-content-around">
                    <div className="d-inline-flex">
                    <Fragment>
                        <Dropzone
                            style={{ minWidth: "350px" }}
                            onChange={updateFiles}
                            minHeight="195px"
                            onClean
                            label="Drop your video"
                            value={files}
                            maxFiles={1}
                            maxFileSize={29980000000}
                            accept="video/*"
                            url="localhost:3001"
                            //of course this url doens´t work, is only to make upload button visible
                            fakeUploading
                            disableScroll
                        >
                            {files.map((file) => (
                            <FileItem
                                {...file}
                                key={file.id}
                                onDelete={onDelete}
                                onWatch={handleWatch}
                                preview
                                info
                                resultOnTooltip
                            />
                            ))}
                        </Dropzone>
                        <VideoPreview
                            videoSrc={videoSrc}
                            openVideo={videoSrc}
                            onClose={(e) => handleWatch(undefined)}
                            controls
                            autoplay
                        />
                    </Fragment>
                    </div>
                    <div className="d-inline-flex">
                        <Button className="btn btn-light btn-lg">
                            <img alt='browse logo' src={browse_logo} width="250" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        
    ); 
}
export default Home;