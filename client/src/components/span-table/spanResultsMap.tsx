import React from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import SpanData from './spanData'
import { selectSpanResultsMap, spanViewType } from './spanResultsMapSlice'
import '../../styles/home.scss'

/**
 * Renders a specific Source Map "View" (utilizing Cytoscape)
 * @Views : Currently Supports both Cluster View and Trace View
 */

interface Props {
  spanData?: any;
}

const spanResultsMap = (Props: Props) => {
 
  const renderType = useAppSelector(selectSpanResultsMap);

  console.log('Props in spanResultsMap', Props)

  const render = renderType.type === spanViewType.render ? <SpanData spanData={Props.spanData}/> : null

  return (
    <>
      <div className="span-results-map">
        {render}
      </div>
    </>
  )
};

export default spanResultsMap;