import React from "react";
import { useAppContext } from "../../appContext";
import { Button } from 'react-bootstrap';
import '../home.css';

function ValidateButton() {
    const { setState } = useAppContext();
    return <>
                <Button 
                    id='validate-button' 
                    className="btn btn-success btn-lg"
                    onClick={ () => setState(1) }
                >
                    Validate
                </Button>
            </>
}

export default ValidateButton;