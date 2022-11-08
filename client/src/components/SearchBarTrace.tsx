import React, { JSXElementConstructor, useEffect } from 'react';
import { changeView, selectSourceMap } from './sourceMapSlice';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { selectTraceView, getTraceDataAsync } from './traceViewSlice';
import { selectSearchTraceResult } from './searchBarSlice';

const SearchBarTrace = (): JSX.Element => {
	

  const traceViewData = useAppSelector(selectSearchTraceResult); 
	const traceData: TraceData[] = [];

	const dispatch = useAppDispatch();
  const submitTrace = (traceID:string):any => {
				//dispatches an action to call on the asynchoronous funciton of getting tracedata
		dispatch(getTraceDataAsync(traceID))
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
	
	//after the async call to get the individual trace info, populate the trace data state in our component to utilize the newly updated info.
	useEffect (() => {



	})
 //create a use effect that upon render, grabs the actual trace data store in the store and display it on top
  //const traceData = useAppSelector(selectTraceViewData);
	console.log(traceData)

  return (
		<div className="searchBar" id="traceSearchBar">
			<div id="traceSearchBarTopHalf">
			  <div id='logo'>
			  </div>
			  <div id="searchBar">
				  <span id='searchText'>
					  Search:
				  </span>
				  <input
				    id="searchBarInput"
				    type='text'
					  name='traceID'
					  placeholder='Enter TraceID, node, pod, or service name'  
					  />
				  <button id="submitButton" onClick={()=>{
						const input = document.getElementById('searchBarInput') as HTMLInputElement;
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
						A1290809809
					  </div>
					  <div className="searchTextPrefix">
						Trace Start:
					  </div>
				  	<div className='searchData'>
						10/12/2022 10:21 AM
					  </div>
					  <div className="searchTextPrefix">
						Total Duration:
					  </div>
					  <div className='searchData'>
						4.03 ms
					  </div>
					  <div className="searchTextPrefix">
						Services:
					  </div>
					  <div className='searchData'>
						3
					  </div>
					  <div className="searchTextPrefix">
						Total Spans:
					  </div>
					  <div className='searchData'>
						6
					  </div>
					  </div>
					<div>
					  <span className="close" onClick={handleClick}>&times;</span>
					</div>
				</div>
			</div>
			<div className='barGraph'>
				Bar Graph Here
			</div>
		</div>
	)

}

export default SearchBarTrace;