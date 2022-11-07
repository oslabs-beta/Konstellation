import React from 'react'
import { useAppDispatch } from '../../lib/hooks';
import { changeView, ViewType } from '../sourceMapSlice';
import { getTraceDataAsync } from '../traceViewSlice';

type TraceData = {
  timestamp: string,
  traceId: string,
  responseTime: string,
  response: string,
  method: string,
  url: string,
  namespaces: string,
}

/** 
   * Renders the list of elements contained within the Trace Table Drawer
   * @Remarks Pre-fetching when hovering over drawerTabHandle will greatly improve performance
   */
const tableList = () => {

  const dispatch = useAppDispatch();
  
  const traceData: TraceData[] = [];

  //TEMP
  //Populates Fake Trace Data
  for(let i = 0; i < 50; i++) {
    traceData[i] = {
      timestamp: '10/12/2022 10:12 AM',
      traceId: '0412jk3401925e92929',
      responseTime: '727 ms',
      response: '200',
      method: 'GET',
      url: 'http://apple.com/...iphone-11',
      namespaces: 'Default, Front-End, Back-End...'
    }
    
    //For Testing if different TraceIds Generate Different Trace Maps. Delete after real trace data is being sent.
    traceData[i].traceId = i === 0 ? '8jfjh1hfhj21-fhj2h' : traceData[i].traceId;
  }

  function loadNewTraceSourceMap(type: ViewType, traceId: string) {
    dispatch(changeView({type: ViewType.trace}))
    dispatch(getTraceDataAsync(traceId));
  }

  const jsxElements = (() => {
    const result: Array<Array<JSX.Element>> = []

    result.push([<div key="trace-table-spacer-entry" className='entry-spacer'> </div>])

    traceData.forEach((e, i) => {
      const entryKey = `trace-table-entry-${i}`
      const fieldKeys = [];
      for(let j = 0; j < 7; j++) {fieldKeys.push(`trace-table-entry-${i}-field-${j}`)}
      result.push([
        <div key={entryKey} className='trace-table-entry'>
          <div key={fieldKeys[0]} className='timestamp'>{e.timestamp}</div>
          <div key={fieldKeys[1]} className='traceId' onClick={()=>loadNewTraceSourceMap(ViewType.trace, e.traceId)}>{e.traceId}</div>
          <div key={fieldKeys[2]} className='response-time'>{e.responseTime}</div>
          <div key={fieldKeys[3]} className='response'>{e.response}</div>
          <div key={fieldKeys[4]} className='method'>{e.method}</div>
          <div key={fieldKeys[5]} className='url'>{e.url}</div>
          <div key={fieldKeys[6]} className='namespaces'>{e.namespaces}</div>
        </div>
      ])
    })

    return result;
  })()

  return (
    <div id="trace-table-list">
      {jsxElements}
    </div>
  )
}

export default tableList