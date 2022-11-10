import React from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../lib/hooks';
import '../../styles/spanTable.scss'
import { selectSourceMap } from '../sourceMapSlice';
import { selectSpanMap } from './spanMapSlice';
import { changeRenderView, RenderType } from './spanMapSlice';
import { useAppSelector } from '../../lib/hooks';
import { selectSearchTraceResult } from '../searchBarSlice';

const spanHeader = () => {

  const { data, id } = useSelector(selectSpanMap)
  console.log('spanHeaderData: ', data)
  const traceId = useSelector(selectSourceMap)

  const dispatch = useAppDispatch();

  let traceData = useAppSelector(selectSearchTraceResult); 
	let exportedtraceViewData: any= traceData.data
  let currentTraceId = 'placeholder'
  if (exportedtraceViewData) {
   currentTraceId = exportedtraceViewData.traceID
  }

  function loadNewSpanTable(type: RenderType) {
    dispatch(changeRenderView({type: RenderType.noRender}))
   }

  return (
    <div id="span-table-header">
      <div className="header">
        <div className='spanHeader'>Span Details</div>
        <button className='button-close' onClick={() => {loadNewSpanTable(RenderType.noRender)}}>X</button>
      </div>
      <div className='spanHeaderPodName'> <span className="boldSpan">Pod Name: </span> {data} </div>
      <div className='spanHeaderPodName'> <span className="boldSpan">TraceID: </span> {currentTraceId}</div>
    </div>
  )
}

export default spanHeader