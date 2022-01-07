import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import '../home.css';
import axios from 'axios'
import fileSaver from 'file-saver'

function YoutubeDownloader() {

    const [url, setUrl] = useState('');
    const [file_name, setFileName] = useState('');
    const [file_extension, setFileExtension] = useState('mp4');
   
    // These methods will update the state properties.
    const onChangeUrl = (e) => {
      const url = e.target.value;
      setUrl(url);
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
        data.append('url', url);
        data.append('name', file_name);
        data.append('to', file_extension);
        
        axios.post('http://localhost:8000/youtube', data, {
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
                            <Form.Label>Youtube link</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Youtube url" 
                                style={{width:'90%'}}
                                onChange={onChangeUrl}                          
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
                        <Button 
                            variant="secondary" 
                            type="button"
                            value="Convert file"
                            onClick={uploadFile}
                        >
                            Download
                        </Button>
                    </Form>
                </div>
            </>
}

export default YoutubeDownloader;