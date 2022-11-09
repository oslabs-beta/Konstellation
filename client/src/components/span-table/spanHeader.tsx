import React from 'react'
import { useSelector } from 'react-redux';
import '../../styles/spanTable.scss'
import { selectSpanMap } from './spanMapSlice';


/** 
   * Defines the contents of the Trace Table Headers
   * @Remarks Manages spacing between elements via a CSS Grid defined in traceTable.scss
   */



const spanHeader = () => {

  const { data } = useSelector(selectSpanMap)
  console.log('spanHeaderData: ', data)

  return (
    <div id="span-table-header">
      <div className='spanHeader'>Span Details</div>
      <div className='spanHeaderPodName'>Pod Name: {data}</div>
    </div>
  )
}

export default spanHeader