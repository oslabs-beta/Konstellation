import React from 'react'

/**
   * @WIP Not yet implemented
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