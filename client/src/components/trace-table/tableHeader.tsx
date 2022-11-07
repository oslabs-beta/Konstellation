import React from 'react'

/** 
   * Defines the contents of the Trace Table Headers
   * @Remarks Manages spacing between elements via a CSS Grid defined in traceTable.scss
   */
const tableHeader = () => {
  return (
    <div id="trace-table-header">
      <div className='timestamp'>Timestamp</div>
      <div className='traceId'>Trace Id</div>
      <div className='responseTime'>Response Time</div>
      <div className='response'>Response</div>
      <div className='method'>Method</div>
      <div className='url'>URL</div>
      <div className='namespaces'>Namespaces</div>
    </div>
  )
}

export default tableHeader