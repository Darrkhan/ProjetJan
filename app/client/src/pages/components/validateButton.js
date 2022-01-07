import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import '../home.css';
import axios from "axios";
import fileSaver from 'file-saver'
import { useAppContext } from "../../appContext";


function ValidateButton() {
  const { uploadedFiles } = useAppContext();
  const [file] = useState(uploadedFiles[0].file);
 
  // This function will handle the submission.
    function uploadFile(){
      let datatype = file.type;
      let dataname = file.name;
      let data = new FormData();
      data.append('file', file);
      axios.post('http://localhost:8000/tmpupload', data, {
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
    const { setState } = useAppContext();
    return <>
                <Button 
                    id='validate-button' 
                    className="btn btn-success btn-lg"
                    onClick={ () => {
                        setState(1);
                        uploadFile();
                    }}
                >
                    Validate
                </Button>
            </>
}

export default ValidateButton;