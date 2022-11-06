import React from 'react'
import '../../styles/traceTable.scss'
import TableContent from './tableContent'
import TableHeader from './tableHeader'
import WindowHeader from './windowHeader'

/**
   * @WIP Not yet implemented
   */
const traceTable = () => {
  return (
    <div id="trace-table-content">
      <WindowHeader />
      <TableHeader />
      <TableContent />
    </div>
  )
}

export default traceTable
