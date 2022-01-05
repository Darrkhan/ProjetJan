import React from 'react';
import './editor.css';
import FileExplorer from './components/fileExplorer'

function Editor() {
    return (
        <>
            <div id='side-file-explorer' style={{backgroundColor:'#212529', color:'white'}}>
                <FileExplorer />
            </div>
        </>
    ); 
}
export default Editor;