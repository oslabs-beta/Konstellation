import React from 'react';
import { changeView } from './sourceMapSlice';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { getTraceDataAsync } from './traceViewSlice';
import {
  selectSearchTraceResult,
  getTraceViewInfo,
} from './searchBarSlice';
import logo from '../../../images/konstellation-logo.png';

const SearchBarTrace = (): JSX.Element => {
  const traceViewData = useAppSelector(selectSearchTraceResult);
  const exportedtraceViewData = traceViewData.data;

  const dispatch = useAppDispatch();
  const submitTrace = (traceID: string): any => {
    //dispatches an action to call on the asynchoronous funciton of getting tracedata
    dispatch(getTraceDataAsync(traceID));
    dispatch(getTraceViewInfo(traceID));
    return;
  };

  const returnToCLusterView = (): any => {
    //returns the view to the cluster view
    dispatch(changeView({ type: 0 }));
    return;
  };

  console.log('this is the exported trace view data', exportedtraceViewData);
  return (
    <div className="searchBar" id="traceSearchBar">
      <div id="traceSearchBarTopHalf">
        <img id="logo" src={logo}></img>
        <div id="searchBarTrace">
          <span id="searchText">Search:</span>
          <input
            id="searchBarInputTrace"
            type="text"
            name="traceID"
            placeholder="Enter TraceID, node, pod, or service name"
          />
          <button
            id="submitButton"
            onClick={() => {
              const input = document.getElementById(
                'searchBarInputTrace'
              ) as HTMLInputElement;
              submitTrace(input.value);
            }}
          >
            {' '}
            Submit
          </button>
          <button id="returnButton" onClick={() => returnToCLusterView()}>
            Cluster View
          </button>
        </div>
      </div>
      <div id="traceSearchBarTraceDetails">
        <div id="traceInfoBarContainer">
          <div id="traceInfoBar">
            <div id="traceMapSearchBar">Trace Map</div>
            <div className="searchTextPrefix">Trace ID:</div>
            <div className="searchData">{exportedtraceViewData?.traceID}</div>
            <div className="searchTextPrefix">Trace Start:</div>
            <div className="searchData">
              {exportedtraceViewData?.traceStart}
            </div>
            <div className="searchTextPrefix">Total Duration:</div>
            <div className="searchData">
              {exportedtraceViewData?.traceDuration}
            </div>
            <div className="searchTextPrefix">Services:</div>
            <div className="searchData">
              {exportedtraceViewData?.serviceCount}
            </div>
            <div className="searchTextPrefix">Total Spans:</div>
            <div className="searchData">{exportedtraceViewData?.spanCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarTrace;
