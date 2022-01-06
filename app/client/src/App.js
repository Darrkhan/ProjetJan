import React, { useState } from 'react';
import './index.css';
import appContext from './appContext';
import Home from './pages/home';
import Editor from './pages/editor';
import OnlineVideo from './pages/onlineVideo'

function situation(state){
    if (state===1) {
        return <Editor/>
    }
    if(state===2) {
        return <OnlineVideo />
    }
    return <Home/>
}

function App() {
    const [state, setState] = useState(0);
    const [filesInQueue, setFilesInQueue] = useState(0);
    const context = {
        state,
        setState,
        filesInQueue,
        setFilesInQueue
    };
    return (
        <appContext.Provider value={context}>
            {situation(state)}
        </appContext.Provider>
    ); 
}
export default App;