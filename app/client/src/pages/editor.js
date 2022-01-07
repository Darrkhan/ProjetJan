import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './editor.css';
import FileExplorer from './components/fileExplorer'
import VideoConverter from './components/videoConverter';
import VideoCutter from './components/videoCutter';
import VideoScreenshot from './components/videoScreenshot';
import GifCreator from './components/gifCreator';
import YoutubeDownloader from './components/youtubeDownloader';
import VideoPlayer from './components/videoPlayer';

function Editor() {

    return (
        <>
            <Row style={{height:'100%'}}>
                <Col sm='3' style={{height:'100%'}}>
                    <div id='side-file-explorer' style={{backgroundColor:'#212529', color:'white'}}>
                        <FileExplorer />
                    </div>
                </Col>
                <Col sm='2' style={{height:'100%'}}>
                    <div id="editorContainer">
                        <VideoConverter />
                        <VideoCutter />
                        <VideoScreenshot />
                        <GifCreator />
                        <YoutubeDownloader />
                    </div>
                </Col>
                <Col sm='7' style={{height:'100%'}}>
                    <div id='videoPreview'>
                        <VideoPlayer />
                    </div>
                </Col>
            </Row>
        </>
    ); 
}
export default Editor;