import React from 'react';
import { Button } from 'react-bootstrap';
import './index.css';
function Home() {

    return (
        <div id="central-buttons">
            <Button className="btn btn-light btn-lg">Light</Button>
            <Button className="btn btn-light btn-lg">Light2</Button> 
        </div>
        
    ); 
}
export default Home;