import { Button, Form, Row, Col } from 'react-bootstrap';
import '../home.css';
import React, { Component } from "react";
import axios from 'axios';

export default class VideoScreenshot extends Component {
    // This is the constructor that stores the data.
    constructor(props) {
      super(props);
   
      this.onChangeFileName = this.onChangeFileName.bind(this);
      this.onChangeFileExtension = this.onChangeFileExtension.bind(this);
      this.onChangeScreenMin = this.onChangeScreenMin.bind(this);
      this.onChangeScreenSec = this.onChangeScreenSec.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   
      this.state = {
        file_name: "",
        file_extension: "",
        screen_min: "",
        screen_sec: ""
      };
    }
   
    // These methods will update the state properties.
    onChangeFileName(e) {
      this.setState({
        file_name: e.target.value,
      });
    }
   
    onChangeFileExtension(e) {
      this.setState({
        file_extension: e.target.value,
      });
    }

    onChangeScreenMin(e) {
        this.setState({
          screen_min: e.target.value,
        });
    }

    onChangeScreenSec(e) {
        this.setState({
          screen_sec: e.target.value,
        });
    }
   
  // This function will handle the submission.
    onSubmit(e) {
      e.preventDefault();
   
      // When post request is sent to the create url, axios will add a new record(screenshot) to the database.
      const screenshot = {
        file_name: this.state.file_name,
        file_extension: this.state.file_extension,
        screen_min: this.state.screen_min,
        screen_sec: this.state.screen_sec
      };
   
      axios
        .post("http://localhost:8000/screen", screenshot)
        .then((res) => console.log(res.data));
   
      // We will empty the state after posting the data to the database
      this.setState({
        file_name: "",
        file_extension: "",
        screen_min: "",
        screen_sec: ""
      });
    }
    render(){
        return <>
                <div className='editorComponents'>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group className="mb-3">
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
                            <Form.Label>Screenshot temps</Form.Label>
                            <Row>
                                <Col  md={5}>
                                    <Form.Control 
                                        placeholder="Minutes"
                                        value={this.state.screen_min}  
                                        onChange={this.onChangeScreenMin}
                                    />
                                </Col>
                                <Col  md={5}>
                                    <Form.Control 
                                        placeholder="Seconds" 
                                        value={this.state.screen_sec}  
                                        onChange={this.onChangeScreenSec}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>To :</Form.Label>
                            <Form.Select 
                                style={{marginLeft:'9px', width:'90%'}}
                                value={this.state.file_extension}
                                onChange={this.onChangeFileExtension}
                            >
                                <option value="jpg">jpg</option>
                                <option value="png">png</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="secondary" type="submit">
                            Screenshot
                        </Button>
                    </Form>
                </div>
            </>
    }
}