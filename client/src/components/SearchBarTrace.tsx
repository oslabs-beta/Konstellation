import React, { JSXElementConstructor, useEffect } from 'react';
import { selectSourceMapData } from './sourceMapSlice';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { trace } from 'console';

const SearchBarTrace = (): JSX.Element => {
	
  
  const submitTrace = ():any => {
    //updates the view data to reflect the new trace
		
		return
		
	}

  const returnToCLusterView = ():any => {
    //returns the view to the cluster view
		return
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
				  <button id="submitButton" onClick={()=>submitTrace()}> submit</button>
					<button id="returnButton" onClick={()=>returnToCLusterView()}>Cluster View</button>
			  </div>
			</div>
			<div id="traceSearchBarTraceDetails">
				<div>
					{traceID}
				</div>
				specific trace details at a glance here
			</div>
		</div>
	)

}

export default SearchBarTrace;