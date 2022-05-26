import React from 'react'
import macIcon from "./macos_folder_icon.png"
import winIcon from "./win10_folder_icon.png"

function FolderDispenser({ isMac, folderDir, onDragStart }) {
  return (
    <div className='folder-container'>
      {folderDir === "" ? <div /> :
        <img draggable={true} onDragStart={onDragStart} src={isMac ? macIcon : winIcon} />
      }
    </div>
  )
}

export default FolderDispenser
