import React, { JSXElementConstructor, useEffect } from 'react';
import { changeView, selectSourceMap } from './sourceMapSlice';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { selectTraceView, getTraceDataAsync } from './traceViewSlice';
import { selectSearchTraceResult, SearchData, getTraceViewInfo } from './searchBarSlice';
import logo from '../../../images/konstellation-logo.png'

const SearchBarTrace = (): JSX.Element => {
	

  let traceViewData = useAppSelector(selectSearchTraceResult); 
	let exportedtraceViewData= traceViewData.data

	const dispatch = useAppDispatch();
  const submitTrace = (traceID:string):any => {
				//dispatches an action to call on the asynchoronous funciton of getting tracedata
		dispatch(getTraceDataAsync(traceID))
		dispatch(getTraceViewInfo(traceID))
		return
	}

  const returnToCLusterView = ():any => {
    //returns the view to the cluster view
    dispatch( changeView({type: 0}))
		return
	}

	const handleClick = ():any => {
		//closes this trace details view?
		//the darrk bottom bar goes back up so that you can hide the details view so you can see more of the map
	}

 //create a use effect that upon render, grabs the actual trace data store in the store and display it on top
  //const traceData = useAppSelector(selectTraceViewData);

	console.log ('this is the exported trace view data', exportedtraceViewData)
  return (
		<div className="searchBar" id="traceSearchBar">
			<div id="traceSearchBarTopHalf">
			  <img id='logo' src={logo}>
			  </img>
			  <div id="searchBarTrace">
				  <span id='searchText'>
					  Search:
				  </span>
				  <input
				    id="searchBarInputTrace"
				    type='text'
					  name='traceID'
					  placeholder='Enter TraceID, node, pod, or service name'  
					  />
				  <button id="submitButton" onClick={()=>{
						const input = document.getElementById('searchBarInputTrace') as HTMLInputElement;
						submitTrace(input.value)}}> Submit</button>
					<button id="returnButton" onClick={()=>returnToCLusterView()}>Cluster View</button>
			  </div>
			</div>
			<div id="traceSearchBarTraceDetails">
				<div id='traceInfoBarContainer'>
				<div id='traceInfoBar'>
					  <div id="traceMapSearchBar">
					  Trace Map
					  </div>
					  <div className="searchTextPrefix">
						Trace ID:
					  </div>
					  <div className='searchData'>
						{exportedtraceViewData?.traceID}
					  </div>
					  <div className="searchTextPrefix">
						Trace Start:
					  </div>
				  	<div className='searchData'>
						{exportedtraceViewData?.traceStart}
					  </div>
					  <div className="searchTextPrefix">
						Total Duration:
					  </div>
					  <div className='searchData'>
						{exportedtraceViewData?.traceDuration}
					  </div>
					  <div className="searchTextPrefix">
						Services:
					  </div>
					  <div className='searchData'>
						{exportedtraceViewData?.serviceCount}
					  </div>
					  <div className="searchTextPrefix">
						Total Spans:
					  </div>
					  <div className='searchData'>
						{exportedtraceViewData?.spanCount}
					  </div>
					  </div>
					<div>
					  <span className="close" onClick={handleClick}>&times;</span>
					</div>
				</div>
			</div>
		</div>
	)

}

export default SearchBarTrace;