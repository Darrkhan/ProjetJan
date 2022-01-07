import React from 'react';
import Moment from 'moment';
import './fileExplorer.css';

import FileBrowser, { Icons } from 'react-keyed-file-browser';

class TheFileExplorer extends React.Component {
  state = {
    files: [
      {
        key: 'database/animals/cat in a hat.wav',
        modified: +Moment().subtract(1, 'hours'),
        size: 1.5 * 1024 * 1024,
      },
      {
        key: 'database/animals/elephants.avi',
        modified: +Moment().subtract(3, 'days'),
        size: 52 * 1024,
      },
      {
        key: 'database/funny fall.mp4',
        modified: +Moment().subtract(2, 'months'),
        size: 13.2 * 1024 * 1024,
      },
      {
        key: 'database/holiday.mp4',
        modified: +Moment().subtract(25, 'days'),
        size: 85 * 1024,
      },
      {
        key: 'database/letter chunks.avi',
        modified: +Moment().subtract(15, 'days'),
        size: 480 * 1024,
      },
      {
        key: 'database/export.mp4',
        modified: +Moment().subtract(15, 'days'),
        size: 4.2 * 1024 * 1024,
      },
    ],
  }

  handleRenameFile = (oldKey, newKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key === oldKey) {
          newFiles.push({
            ...file,
            key: newKey,
            modified: +Moment(),
          })
        } else {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }

  render() {
    return (
      <FileBrowser
        files={this.state.files}
        icons={Icons.FontAwesome(4)}
        onMoveFile={this.handleRenameFile}
      />
    )
  }
}

function FileExplorer() {
    
    return <>
                <TheFileExplorer />
            </>
}

export default FileExplorer;