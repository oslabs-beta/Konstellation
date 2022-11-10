import React from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../lib/hooks';
import { changeSpanDataView, selectSpanResultsMap, spanViewType } from './spanResultsMapSlice';
import { getSpanDataAsync } from './spanDataSlice';
import { selectSpanTableList } from './spanListSlice';
import '../../styles/spanTable.scss'
import SpanData from './spanData'
import SpanResultsMap from './spanResultsMap';
import { ViewType } from '../sourceMapSlice';


/** 
   * Defines the contents of the Trace Table Headers
   * @Remarks Manages spacing between elements via a CSS Grid defined in traceTable.scss
   */
const spanList = () => {

  const { data } = useSelector(selectSpanTableList)
  const dispatch = useAppDispatch();

  function loadNewSpanResults(type: spanViewType, spanId: String) {
    console.log('in loadNewSpanResults')
    dispatch(changeSpanDataView({type}))
    // dispatch(getSpanDataAsync(spanId))
  }

  // interface Props {
  //   traceId? : String
  // }
 
  const { type } = useSelector(selectSpanResultsMap)

  const jsxElements = (() => {
    const result: Array<Array<JSX.Element>> = []

   

    result.push([<div key="span-table-spacer-entry" className='span-entry-spacer'> </div>])

    for (let i = 0; i < data.length; i++) {
      const e = data[i];

      const entryKey = `span-table-entry-${i}`
      console.log(e)
      console.log('duration', data[i].spanData.duration)

      const spanData = 'hello'
      const spanID = e.spanIds

      result.push([
        <div key={entryKey} className='span-pod-entry'>
          {/* <br></br> */}
          <div className="span-entry">
          <button className="spanButton" onClick={() => {if (type === spanViewType.noRender) {loadNewSpanResults(spanViewType.render, data[i])} else {loadNewSpanResults(spanViewType.noRender, data[i].spanIds)}}}>{'>'}</button>
          <div key={entryKey} className='span-name'><span className='boldSpanName'>SpanID: </span>{data[i].spanIds}</div>
          </div>
          <div className="span-details">
          <SpanResultsMap spanData={data[i].spanData}/>
          </div>
        </div>
      ])
    }

    return result;
  })()

  return (
    <div id="span-table-list">
      {jsxElements}
    </div>
  )
}


export default spanList