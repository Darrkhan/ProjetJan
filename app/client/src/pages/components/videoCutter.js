import React, { Component } from "react";
import { Button, Form, Row, Col } from 'react-bootstrap';
import '../home.css';
import axios from 'axios';

export default class VideoCutter extends Component {
    // This is the constructor that stores the data.
    constructor(props) {
      super(props);
   
      this.onChangeFileName = this.onChangeFileName.bind(this);
      this.onChangeFileExtension = this.onChangeFileExtension.bind(this);
      this.onChangeBeginMin = this.onChangeBeginMin.bind(this);
      this.onChangeBeginSec = this.onChangeBeginSec.bind(this);
      this.onChangeEndMin = this.onChangeEndMin.bind(this);
      this.onChangeEndSec = this.onChangeEndSec.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   
      this.state = {
        file_name: "",
        file_extension: "",
        begin_min: "",
        begin_sec: "",
        end_min: "",
        end_sec: ""
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

    onChangeBeginMin(e) {
        this.setState({
            begin_min: e.target.value,
        });
    }

    onChangeBeginSec(e) {
        this.setState({
            begin_sec: e.target.value,
        });
    }

    onChangeEndMin(e) {
        this.setState({
            end_min: e.target.value,
        });
    }

    onChangeEndSec(e) {
        this.setState({
            end_sec: e.target.value,
        });
    }

      
  // This function will handle the submission.
    onSubmit(e) {
      e.preventDefault();
   
      // When post request is sent to the create url, axios will add a new record(newvideo) to the database.
      const newvideo = {
        file_name: this.state.file_name,
        file_extension: this.state.file_extension,
        begin_min: this.state.begin_min,
        begin_sec: this.state.begin_sec,
        end_min: this.state.end_min,
        end_sec: this.state.end_sec
      };
   
      axios
        .post("http://localhost:8000/cut", newvideo)
        .then((res) => console.log(res.data));
   
      // We will empty the state after posting the data to the database
      this.setState({
        file_name: "",
        file_extension: "",
        begin_min: "",
        begin_sec: "",
        end_min: "",
        end_sec: ""
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
                            <Form.Label>Begin at</Form.Label>
                            <Row>
                                <Col  md={5}>
                                    <Form.Control 
                                        placeholder="Minutes"
                                        value={this.state.begin_min}  
                                        onChange={this.onChangeBeginMin} 
                                    />
                                </Col>
                                <Col  md={5}>
                                    <Form.Control 
                                        placeholder="Seconds" 
                                        value={this.state.begin_sec}  
                                        onChange={this.onChangeBeginSec} 
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
                                        value={this.state.end_min}  
                                        onChange={this.onChangeEndMin} 
                                    />
                                </Col>
                                <Col  md={5}>
                                    <Form.Control 
                                        placeholder="Seconds"
                                        value={this.state.end_sec}  
                                        onChange={this.onChangeEndSec} 
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
                            value="Cut file"
                        >
                            Cut
                        </Button>
                    </Form>
                </div>
            </>
    }
}