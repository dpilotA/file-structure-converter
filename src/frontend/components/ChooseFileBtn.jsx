import { faArrowUpFromBracket, faCheck, faCircleNotch, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, {useState, useEffect} from 'react'


function ChooseFileBtn({title, onUpload, filesPicked, loading, onRepeat}) {
  
  async function onClick() {
    filesPicked ? onRepeat() : onUpload();
  }
  
  return (
    <a className={`button${filesPicked ? " success" : ""}${loading && !filesPicked ? " loading" : ""}`} href="#" role="button" onClick={onClick}>
        <span>{title}</span>
        <div className="icon">
            <FontAwesomeIcon className='upload-icon fa' icon={faArrowUpFromBracket}/>
            <FontAwesomeIcon className='spinner-icon fa' icon={faCircleNotch} spin/>
            <FontAwesomeIcon className='check-icon fa' icon={faCheck}/>
            <FontAwesomeIcon className='refresh-icon fa'  icon={faRefresh}/>
        </div>
    </a>
  )
}

export default ChooseFileBtn
