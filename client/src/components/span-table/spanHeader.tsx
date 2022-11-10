import React from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../lib/hooks';
import '../../styles/spanTable.scss'
import { selectSourceMap } from '../sourceMapSlice';
import { selectSpanMap } from './spanMapSlice';
import { changeRenderView, RenderType } from './spanMapSlice';

/** 
   * Defines the contents of the Trace Table Headers
   * @Remarks Manages spacing between elements via a CSS Grid defined in traceTable.scss
   */


 
const spanHeader = () => {

  const { data, id } = useSelector(selectSpanMap)
  // console.log('spanHeaderData: ', data)
  const traceId = useSelector(selectSourceMap)

  const dispatch = useAppDispatch();

  function loadNewSpanTable(type: RenderType) {
    dispatch(changeRenderView({type: RenderType.noRender}))
   }

  return (
    <div id="span-table-header">
      <div className="header">
        <div className='spanHeader'>Span Details</div>
        <button className='button-close' onClick={() => {loadNewSpanTable(RenderType.noRender)}}>X</button>
      </div>
      <div className='spanHeaderPodName'>Pod Name: {data}</div>
      <div className='spanHeaderPodName'>TraceID: {traceId.data}</div>
    </div>
  )
}

export default spanHeader