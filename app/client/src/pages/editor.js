import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './editor.css';
import { Routes, Route } from 'react-router-dom'
import FileExplorer from './components/fileExplorer'
import VideoConverter from './components/videoConverter';
import VideoCutter from './components/videoCutter';
import VideoScreenshot from './components/videoScreenshot';

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
                        <Routes>
                            <Route path="/" element={<VideoConverter />} />
                            <Route path="/" element={<VideoCutter />} />
                            <Route path="/" element={<VideoScreenshot />} />
                        </Routes>
                    </div>
                </Col>
                <Col sm='7' style={{height:'100%'}}>
                    <div id='videoPreview'>

                    </div>
                </Col>
            </Row>
        </>
    ); 
}
export default Editor;