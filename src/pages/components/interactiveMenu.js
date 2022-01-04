import React from 'react';
import { Button } from 'react-bootstrap';
import '../home.css';
import browse_logo from '../../assets/browse.png';
import { useAppContext } from '../../appContext';
import ValidateButton from '../components/validateButton';

function InteractiveMenu() {
    const { filesInQueue, setState } = useAppContext();
    if(filesInQueue){
        return <ValidateButton />;
    }
    return <>
            <Button className="btn btn-light btn-lg">
                <img 
                    alt='browse logo' src={browse_logo} 
                    onClick={ () => setState(2) } 
                    width="250" 
                />
            </Button>
        </>
}

export default InteractiveMenu;