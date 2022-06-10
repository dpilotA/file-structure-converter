import { faDownLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function ArrowProgress({ progress }) {
  var pProg = (1 - progress) * 100;
  return (
    <div className='arrowWrapper grid'>
      <div style={{ clipPath: `inset(0px 0px ${pProg}% 0px)` }} className="l1">

      <FontAwesomeIcon className='myArrow' color='black' icon={faDownLong} size="5x" />
      </div>
      <FontAwesomeIcon className='myArrow l1' color='rgba(0,0,0,0.50)' icon={faDownLong} size="5x" />
    </div>
  )
}

export default ArrowProgress
