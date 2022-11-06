import React from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import ClusterView from './clusterView'
import TraceView from './traceView'
import { selectSourceMapType, ViewType } from './sourceMapSlice'

const sourceMap = () => {
 
  const viewType = useAppSelector(selectSourceMapType);

  if(viewType === ViewType.cluster) {
    return (
      <ClusterView />
    )
  }
  else if (viewType === ViewType.trace) {
    return (
      <TraceView />
    )
  }
  else {
    return (
      <TraceView />
    )
  }
};

export default sourceMap;
