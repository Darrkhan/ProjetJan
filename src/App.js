import React from 'react';
import './index.css';

function getGreetingMessage() {
    let x = 0;
    for (let index = 0; index < 15; index++) {
        x= index+x;
    }
    return x;
}
function App() {
    
    return (
        <div>
            <h1>{getGreetingMessage()}</h1>
        </div>
    ); 
}
export default App;