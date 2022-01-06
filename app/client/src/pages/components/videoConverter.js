import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import '../home.css';
import axios from 'axios';

export default class VideoConverter extends Component {
    // This is the constructor that stores the data.
    constructor(props) {
      super(props);
      this.onChangeFile = this.onChangeFile.bind(this);
      this.onChangeFileName = this.onChangeFileName.bind(this);
      this.onChangeFileExtension = this.onChangeFileExtension.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        file: "",
        file_name: "",
        file_extension: "mp4",
      };
    }
   
    // These methods will update the state properties.
    onChangeFile = (e) => {
        this.file=e.target.files[0];
        console.log(this.file);
      }

    onChangeFileName = (e) => {
      this.setState({
        file_name: e.target.value,
      });
    }
   
    onChangeFileExtension = (e) => {
      this.setState({
        file_extension: e.target.value,
      });
    }
   
  // This function will handle the submission.
    onSubmit(e) {
      e.preventDefault();

      // When post request is sent to the create url, axios will add a new record(conversion) to the database.
      const conversion = {
        file: this.state.file,
        file_name: this.state.file_name,
        file_extension: this.state.file_extension,
      };
   
      axios
        .post("http://localhost:8000/convert", conversion)
        .then((res) => console.log(res.data));
   
      // We will empty the state after posting the data to the database
      this.setState({
        file: "",
        file_name: "",
        file_extension: "mp4",
      });
    }
    render(){
        return <>
                <div className='editorComponents'>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                    type="file"
                                    style={{width:'90%'}}
                                    name="file"
                                    onChange={this.onChangeFile}                          
                                />
                            <Form.Label>File name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="File name" 
                                style={{width:'90%'}}
                                value={this.state.file_name}  
                                onChange={this.onChangeFileName}                          
                            />
                            <Form.Text className="text-muted">
                                You can choose a new name.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>To :</Form.Label>
                            <Form.Select 
                                style={{marginLeft:'9px', width:'90%'}}
                                value={this.state.file_extension}
                                onChange={this.onChangeFileExtension}
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
                            type="submit"
                            value="Convert file"
                        >
                            Convert
                        </Button>
                    </Form>
                </div>
            </>
    }
}