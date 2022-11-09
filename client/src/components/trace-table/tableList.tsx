import React from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../lib/hooks';
import { changeView, ViewType } from '../sourceMapSlice';
import { getTraceDataAsync } from '../traceViewSlice';
import { selectTableList, TraceTableEntry } from './tableListSlice';

/** 
   * Renders the list of elements contained within the Trace Table Drawer
   * @Remarks Pre-fetching when hovering over drawerTabHandle will greatly improve performance
   */
const tableList = () => {

  const { data } = useSelector(selectTableList)
  const dispatch = useAppDispatch();
  
  function loadNewTraceSourceMap(type: ViewType, data: string) {
    dispatch(changeView({type: ViewType.trace, data}))
    dispatch(getTraceDataAsync(data));
  }

  const jsxElements = (() => {
    const result: Array<Array<JSX.Element>> = []

    result.push([<div key="trace-table-spacer-entry" className='entry-spacer'> </div>])

    // data.forEach((e: TraceTableEntry, i: number) => {
    const validMethods = ['GET', 'POST', 'CREATE', 'DELETE']
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      const maxUrlLength = 40;
      let renderedUrl = 'tempShortenedUrl'

      //NOTE: Some data being filtered due to issues with JaegerQuery. 
      //Temporary band-aid to hide bugged results.
      if(e.data.url == 'unknown' || !validMethods.includes(e.data.method)) {
        continue;
      }

      //NOTE: Trimming URL to prevent overflow in table
      else if(e.data.url.length > maxUrlLength) {
        renderedUrl = (e.data.url).slice(0, maxUrlLength) + '...'
        renderedUrl = renderedUrl.indexOf('http://') != -1 ? renderedUrl.slice(7, renderedUrl.length) : renderedUrl 
      }
      else {
        renderedUrl = e.data.url;
      }

      const entryKey = `trace-table-entry-${i}`
      const fieldKeys = [];
      for(let j = 0; j < 7; j++) {fieldKeys.push(`trace-table-entry-${i}-field-${j}`)}

      result.push([
        <div key={entryKey} className='trace-table-entry'>
          <div key={fieldKeys[0]} className='timestamp'>{e.data.timestamp.slice(0, e.data.timestamp.indexOf("-") +3)}</div>
          <div key={fieldKeys[1]} className='traceId' onClick={()=>loadNewTraceSourceMap(ViewType.trace, e.data.id)}>{e.data.id}</div>
          <div key={fieldKeys[2]} className='response-time'>{e.data.duration}ms</div>
          <div key={fieldKeys[3]} className='response'>{e.data.response}</div>
          <div key={fieldKeys[4]} className='method'>{e.data.method}</div>
          <div key={fieldKeys[5]} className='url'>{renderedUrl}</div>
          <div key={fieldKeys[6]} className='namespaces'>{e.data.namespaces}</div>
        </div>
      ])
    }

    return result;
  })()

  return (
    <div id="trace-table-list">
      {jsxElements}
    </div>
  )
}

export default tableList