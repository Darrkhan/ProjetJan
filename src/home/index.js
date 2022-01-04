import React from 'react';
import { Button } from 'react-bootstrap';
import './index.css';
import upload_logo from '../assets/upload.png';
import browse_logo from '../assets/browse.png';

function Home() {

    return (
        <div id='popup'>
            <div id='popup-content'>
                <div id='buttons-div' className="d-flex justify-content-around">
                    <div className="d-inline-flex"><Button className="btn btn-light btn-lg"><img alt='upload logo' src={upload_logo} width="60" /></Button></div>
                    <div className="d-inline-flex"><Button className="btn btn-light btn-lg"><img alt='browse logo' src={browse_logo} width="60" /></Button></div>
                </div>
            </div>
        </div>
        
    ); 
}
export default Home;