import React from 'react'
import '../../styles/traceTable.scss'
import DurationSelector from './durationSelector'

/**
   * @WIP Not yet implemented
   */
const windowHeader = () => {
  return (
    <div id="trace-table-window-header">
      <h1>Trace View</h1>
      
      <div id="trace-table-window-header__duration-container">
        Show:
        <DurationSelector />
      </div>
    </div>
  )
}

export default windowHeader
