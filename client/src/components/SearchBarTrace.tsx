import React, { JSXElementConstructor, useEffect } from 'react';
import { changeView, selectSourceMapData, updateData } from './sourceMapSlice';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { trace } from 'console';

const SearchBarTrace = (): JSX.Element => {
	
	const dispatch = useAppDispatch();
  const submitTrace = (traceID?:string | undefined):any => {
    //updates the view data to reflect the new trace
		console.log(traceID)
		dispatch(updateData({type: 1, data:traceID}))
		return
		
	}

  const returnToCLusterView = ():any => {
    //returns the view to the cluster view
    dispatch( changeView({type: 0}))
		return
	}

	const handleClick = ():any => {
		//closes this trace details view?
	}

	const traceID = useAppSelector(selectSourceMapData);
	console.log(traceID)
  return (
		<div className="searchBar" id="traceSearchBar">
			<div id="traceSearchBarTopHalf">
			  <div id='logo'>
				  logo here
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
						submitTrace(input.value)}}> submit</button>
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
					{traceID}
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