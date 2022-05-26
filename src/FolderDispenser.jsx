import React from 'react'

function FolderDispenser({ isMac, folderDir, onDragStart }) {
  return (
    <div className='folder-container'>
      {folderDir !== "" ? <div /> :
        <img draggable={true} onDragStart={onDragStart} src="../Images/macos_folder_icon.png" />
      }
    </div>
  )
}

export default FolderDispenser
