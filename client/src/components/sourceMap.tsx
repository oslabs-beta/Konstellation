import React from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import ClusterView from './clusterView'
import TraceView from './traceView'
import { selectSourceMap, ViewType } from './sourceMapSlice'
import '../styles/home.scss'


const sourceMap = () => {
 
  const viewType = useAppSelector(selectSourceMap);

  const view = viewType === ViewType.cluster ? <ClusterView /> : <TraceView />

  return (
    <>
      <div className="home__source-map">
        {view}
      </div>
    </>
  )
};

export default sourceMap;
