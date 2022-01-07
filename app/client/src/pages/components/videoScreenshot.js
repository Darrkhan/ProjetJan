import { Button, Form, Row, Col } from 'react-bootstrap';
import '../home.css';
import React, { useState } from "react";
import axios from 'axios';
import fileSaver from 'file-saver';
import { useAppContext } from '../../appContext';

function VideoScreenshot() {
  const { uploadedFiles } = useAppContext();
  const [file, setFile] = useState(uploadedFiles[0].file);
  const [screenshot_min, setScreenshotMin] = useState('');
  const [screenshot_sec, setScreenshotSec] = useState('');
  const [file_name, setFileName] = useState('');
  const [file_extension, setFileExtension] = useState('jpg');
 
  // These methods will update the state properties.
  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }
  
  const onChangeScreenMin = (e) => {
    const screenshot_min = e.target.value;
    setScreenshotMin(screenshot_min);
  }

  const onChangeScreenSec = (e) => {
    const screenshot_sec =e.target.value;
    setScreenshotSec(screenshot_sec);
  }

  const onChangeFileName = (e) => {
    const file_name = e.target.value;
    setFileName(file_name);
  }
 
  const onChangeFileExtension = (e) => {
    const file_extension = e.target.value;
    setFileExtension(file_extension);
  }
 
  // This function will handle the submission.
    const uploadFile = () => {
      let datatype = 'image/' + file_extension;
      let dataname = file_name + '.' + file_extension;
      let data = new FormData();
      data.append('file', file);
      data.append('name', file_name);
      data.append('to', file_extension);
      data.append('minScreen', screenshot_min);
      data.append('secScreen', screenshot_sec);
      
      axios.post('http://localhost:8000/screenshot', data, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'multipart/form-data',
        }
        }).then(res => {
            console.log("I have an answer !");
            var blob = new Blob([res.data], { type: datatype });
            fileSaver.saveAs(blob, dataname);
        }).catch(err => console.log(err))
    }
    return <>
                <div className='editorComponents'>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>File name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="File name" 
                                style={{width:'90%'}}
                                onChange={onChangeFileName} 
                            />
                            <Form.Text className="text-muted">
                                You can choose a new name.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Screenshot temps</Form.Label>
                            <Row>
                                <Col  md={5}>
                                    <Form.Control
                                        placeholder="Minutes"
                                        onChange={onChangeScreenMin}
                                    />
                                </Col>
                                <Col  md={5}>
                                    <Form.Control 
                                        placeholder="Seconds"
                                        onChange={onChangeScreenSec}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>To :</Form.Label>
                            <Form.Select 
                                style={{marginLeft:'9px', width:'90%'}}
                                onChange={onChangeFileExtension}
                            >
                                <option value="jpg">jpg</option>
                                <option value="png">png</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="secondary" type="button" onClick={uploadFile}>
                            Screenshot
                        </Button>
                    </Form>
                </div>
            </>
}

export default VideoScreenshot;