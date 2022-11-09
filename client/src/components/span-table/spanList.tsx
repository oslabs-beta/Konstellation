import React from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../lib/hooks';
// import { changeView, ViewType } from '../sourceMapSlice';
import { getSpanTableAsync } from './spanListSlice';
import { selectSpanTableList } from './spanListSlice';

/** 
   * Defines the contents of the Trace Table Headers
   * @Remarks Manages spacing between elements via a CSS Grid defined in traceTable.scss
   */
const spanList = () => {

  const { data } = useSelector(selectSpanTableList)
  const dispatch = useAppDispatch();

  //to fetch span names on load
  // function loadSpanDataTable(spanName: any) {
  //   dispatch(getSpanTableAsync());
  // }

  const jsxElements = (() => {
    const result: Array<Array<JSX.Element>> = []

    result.push([<div key="span-table-spacer-entry" className='span-entry-spacer'> </div>])

    for (let i = 0; i < data.length; i++) {
      const e = data[i];

      const entryKey = `span-table-entry-${i}`
      

      result.push([
        <div key={entryKey} className='span-pod-entry'>
          <div key={entryKey} className='span-Pod-entry' >{data[i]}</div>
        </div>
      ])
    }

    // onClick={()=>loadSpanTableData(e.data.name)}

    return result;
  })()

  return (
    <div id="span-table-list">
      {jsxElements}
    </div>
  )
}


export default spanList