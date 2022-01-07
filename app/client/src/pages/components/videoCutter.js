import React, { useState } from "react";
import { Button, Form, Row, Col } from 'react-bootstrap';
import '../home.css';
import axios from 'axios';
import fileSaver from 'file-saver'
import { useAppContext } from "../../appContext";

function VideoCutter() {
  const { uploadedFiles } = useAppContext();
  const [file, setFile] = useState(uploadedFiles[0].file);
  const [begin_min, setBeginMin] = useState('');
  const [begin_sec, setBeginSec] = useState('');
  const [end_min, setEndMin] = useState('');
  const [end_sec, setEndSec] = useState('');
  const [file_name, setFileName] = useState('');
  const [file_extension, setFileExtension] = useState('mp4');
 
  // These methods will update the state properties.
  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }
  
  const onChangeBeginMin = (e) => {
    const begin_min = e.target.value;
    setBeginMin(begin_min);
  }

  const onChangeBeginSec = (e) => {
    const begin_sec =e.target.value;
    setBeginSec(begin_sec);
  }

  const onChangeEndMin = (e) => {
    const end_min = e.target.value;
    setEndMin(end_min);
  }

  const onChangeEndSec = (e) => {
    const end_sec =e.target.value;
    setEndSec(end_sec);
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
      let datatype = 'video/' + file_extension;
      let dataname = file_name + '.' + file_extension;
      let data = new FormData();
      data.append('file', file);
      data.append('name', file_name);
      data.append('to', file_extension);
      data.append('min', begin_min);
      data.append('sec', begin_sec);
      data.append('min1', end_min);
      data.append('sec1', end_sec);
      
      axios.post('http://localhost:8000/cut', data, {
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
                            <Form.Control 
                                    type="file"
                                    style={{width:'90%'}}
                                    name="file" 
                                    onChange={onChangeFile}                          
                            />
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
                            <Form.Label>Begin at</Form.Label>
                            <Row>
                                <Col  md={5}>
                                    <Form.Control 
                                        placeholder="Minutes"
                                        onChange={onChangeBeginMin} 
                                    />
                                </Col>
                                <Col  md={5}>
                                    <Form.Control 
                                        placeholder="Seconds" 
                                        onChange={onChangeBeginSec} 
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End at</Form.Label>
                            <Row>
                                <Col  md={5}>
                                    <Form.Control 
                                        placeholder="Minutes"
                                        onChange={onChangeEndMin} 
                                    />
                                </Col>
                                <Col  md={5}>
                                    <Form.Control 
                                        placeholder="Seconds"
                                        onChange={onChangeEndSec} 
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
                                <option value="mp4">mp4</option>
                                <option value="flv">flv</option>
                                <option value="avi">avi</option>
                                <option value="webm">webm</option>
                                <option value="mov">mov</option>
                                <option value="mp3">mp3</option>
                                <option value="wav">wav</option>
                            </Form.Select>
                        </Form.Group>
                        <Button 
                            variant="secondary" 
                            type="button"
                            value="Cut file"
                            onClick={uploadFile}
                        >
                            Cut
                        </Button>
                    </Form>
                </div>
            </>
}

export default VideoCutter;