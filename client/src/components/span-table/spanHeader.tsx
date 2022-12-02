import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../lib/hooks';
import '../../styles/spanTable.scss';
import { selectSourceMap } from '../sourceMapSlice';
import { selectSpanMap } from './spanMapSlice';
import { changeRenderView, RenderType } from './spanMapSlice';
import { useAppSelector } from '../../lib/hooks';
import { selectSearchTraceResult } from '../searchBarSlice';

const spanHeader = () => {
  const { data } = useSelector(selectSpanMap);
  console.log('spanHeaderData: ', data);

  const dispatch = useAppDispatch();

  const traceData = useAppSelector(selectSearchTraceResult);
  const exportedtraceViewData: any = traceData.data;
  let currentTraceId = 'placeholder';
  if (exportedtraceViewData) {
    currentTraceId = exportedtraceViewData.traceID;
  }

  function loadNewSpanTable(type: RenderType) {
    dispatch(changeRenderView({ type: RenderType.noRender }));
  }

  return (
    <div id="span-table-header">
      <div className="header">
        <div className="spanHeader">Span Details</div>
        <button
          className="button-close"
          onClick={() => {
            loadNewSpanTable(RenderType.noRender);
          }}
        >
          X
        </button>
      </div>
      <div className="spanHeaderPodName">
        {' '}
        <span className="boldSpan span-label">Pod Name: </span> {data}{' '}
      </div>
      <div className="spanHeaderPodName">
        {' '}
        <span className="boldSpan span-label">TraceID: </span> {currentTraceId}
      </div>
    </div>
  );
};

export default spanHeader;
