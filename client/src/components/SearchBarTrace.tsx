import React from 'react';



const SearchBarTrace = (): JSX.Element => {
	

  const submitTrace = ():any => {
    //sends a fetch request to the api to get the data from a particular trace
		

		return

	}

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