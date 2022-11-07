import React from 'react'

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
  }

  const jsxElements = (() => {
    const result: Array<Array<JSX.Element>> = []

    result.push([<div className='entry-spacer'> </div>])

    traceData.forEach(e => {
      result.push([
        <div className='trace-table-entry'>
          <div className='timestamp'>{e.timestamp}</div>
          <div className='traceId'>{e.traceId}</div>
          <div className='response-time'>{e.responseTime}</div>
          <div className='response'>{e.response}</div>
          <div className='method'>{e.method}</div>
          <div className='url'>{e.url}</div>
          <div className='namespaces'>{e.namespaces}</div>
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