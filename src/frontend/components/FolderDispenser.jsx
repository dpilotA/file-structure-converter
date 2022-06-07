import React from 'react'
import macIcon from "../../assets/macos_folder_icon.png"
import winIcon from "../../assets/win10_folder_icon.png"

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
