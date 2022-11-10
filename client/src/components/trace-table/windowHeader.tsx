import React from 'react'
import { useSelector } from 'react-redux'
import '../../styles/traceTable.scss'
import DurationSelector from './durationSelector'
import { selectTableList } from './tableListSlice'
import TableDropDownMenu from './tableDropdownMenu'

/**
   * @WIP Not yet implemented
   */
const windowHeader = () => {

  const tableList = useSelector(selectTableList)

  return (
    <div id="trace-table-window-header">
      <h1>Trace View - {tableList.data.length} Results</h1>
      <div id='trace-table-dropdown-menu'>
				Services:
				<TableDropDownMenu/>
			</div>
      <div id="trace-table-window-header__duration-container">
        Show:
        <DurationSelector />
      </div>
    </div>
  )
}

export default windowHeader
