import { faArrowUpFromBracket, faCheck, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, {useState, useEffect} from 'react'


function ChooseFileBtn({title, onClick, filesPicked, loading}) {
  
  async function btnClick() {
    onClick();
  }
  // useEffect(() => {
  //   if (filesPicked) {
  //     setLoading(false);
  //   }
  
    
  // }, [filesPicked])
  
  return (
    <a className={`button${filesPicked ? " success" : ""}${loading && !filesPicked ? " loading" : ""}`} href="#" role="button" onClick={btnClick}>
        <span>{title}</span>
        <div className="icon">
            <FontAwesomeIcon className='upload-icon fa' icon={faArrowUpFromBracket}/>
            <FontAwesomeIcon className='spinner-icon fa' icon={faCircleNotch} spin/>
            <FontAwesomeIcon className='check-icon fa' icon={faCheck}/>
        </div>
    </a>
  )
}

export default ChooseFileBtn
