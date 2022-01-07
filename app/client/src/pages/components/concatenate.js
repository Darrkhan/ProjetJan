import { Button, Form, Row, Col } from 'react-bootstrap';
import '../home.css';
import React, { useState } from "react";
import axios from 'axios';
import fileSaver from 'file-saver';
import { useAppContext } from '../../appContext';

function VideosConcatenate() {
  const { uploadedFiles } = useAppContext();
  const [file, setFile] = useState(uploadedFiles);
 
 
  // This function will handle the submission.
    const uploadFile = () => {
      let datatype = file[0].datatype;
      let data = new FormData();
      data.append('files', file);
      
      axios.post('http://localhost:8000/merge', data, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'multipart/form-data',
        }
        }).then(res => {
            console.log("I have an answer !");
            var blob = new Blob([res.data], { type: datatype });
            fileSaver.saveAs(blob, file[0].name);
        }).catch(err => console.log(err))
    }
    return <>
                <div className='editorComponents'>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Merge videos</Form.Label>
                        </Form.Group>
                        <Button variant="secondary" type="button" onClick={uploadFile}>
                            Merge
                        </Button>
                    </Form>
                </div>
            </>
}

export default VideosConcatenate;