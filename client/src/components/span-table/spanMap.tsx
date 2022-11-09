import React from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import SpanTableContent from './spanTableContent'
import { selectSpanMap, RenderType } from './spanMapSlice'
import '../../styles/home.scss'

/**
 * Renders a specific Source Map "View" (utilizing Cytoscape)
 * @Views : Currently Supports both Cluster View and Trace View
 */
const spanMap = () => {
 
  const renderType = useAppSelector(selectSpanMap);

  const render = renderType.type === RenderType.render ? <SpanTableContent /> : null

  return (
    <>
      <div className="span-map">
        {render}
      </div>
    </>
  )
};

export default spanMap;