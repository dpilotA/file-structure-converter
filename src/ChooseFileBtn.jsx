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
    <a class={`button${filesPicked ? " success" : ""}${loading && !filesPicked ? " loading" : ""}`} href="#" role="button" onClick={btnClick}>
        <span>{title}</span>
        <div class="icon">
          
            {/* <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
            <FontAwesomeIcon icon="fas fa-circle-notch" />
            <FontAwesomeIcon icon="fa-solid fa-check" /> */}
            <FontAwesomeIcon className='upload-icon fa' icon={faArrowUpFromBracket}/>
            <FontAwesomeIcon className='spinner-icon fa' icon={faCircleNotch} spin/>
            <FontAwesomeIcon className='check-icon fa' icon={faCheck}/>
            {/* <i class="fa fa-remove"></i> */}
            {/* <i class="fa fa-remove"></i> */}
            {/* <i class="fa fa-check"></i> */}
        </div>
    </a>
    // <button className='fileBtn' onClick={onClick}>{title}</button>
  )
}

export default ChooseFileBtn
