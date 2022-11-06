import React from 'react';
import { selectSourceMapData } from './sourceMapSlice';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { trace } from 'console';

const SearchBarTrace = (): JSX.Element => {
	
  
  const submitTrace = ():any => {
    //sends a fetch request to the api to get the data from a particular trace
		
		return
		
	}
	const traceID = useAppSelector(selectSourceMapData);
	console.log(traceID)
  return (
		<div className="searchBar">
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
			</div>
		</div>
	)

}

export default SearchBarTrace;