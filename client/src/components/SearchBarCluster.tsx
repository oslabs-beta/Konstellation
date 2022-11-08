import React, { JSXElementConstructor, useEffect } from 'react';
import { selectSourceMap, ViewType, changeView } from './sourceMapSlice'
import {getTraceViewInfo, selectNameSpace} from './searchBarSlice'
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { trace } from 'console';
import { getTraceDataAsync } from './traceViewSlice'
import { selectCluster, updateNameSpace } from './clusterViewSlice';

const SearchBarCluster = ():JSX.Element => {
	
	const dispatch = useAppDispatch();
  
	//fetches the namespaces
  const { data } = useAppSelector(selectCluster);
  

  const submitTrace = (traceID:string):any => {
		//changes the state from cluster to trace view
		//update view so that the data property is updated to the inputted trace view and changes the view type
		dispatch(changeView({type: 1}))
		//dispatches an action to call on the asynchoronous funciton of getting tracedata
		dispatch(getTraceDataAsync(traceID))
		return
	}

	//handles changing the namespace state
	const changeNameSpace = (e:any) => {
		dispatch(updateNameSpace(e.target.value))
	} 

  //populates the dropdown menu with namespaces
  //adds only the namespace elements to the array
	const DropDownOptions: React.ReactElement[] =[]
  const nameSpaceData = []
	for (let i = 0; i < data.length;i++){
		if (data[i].data.type === 'namespace'){
			nameSpaceData.push (data[i].data.id)	
		}
	}

	nameSpaceData.forEach(element => {
		DropDownOptions.push (<option className='options'>{element}</option>)
	})

return (
		<div className="searchBar">
			<div id='logo'>
			</div>
			<div id="namespaceDropDown">
				<div id="namespaceText">
			  namespace:
				</div>
			  <div className="dropdown">
                <select className='dropDownOptions'required onChange={(e)=>{changeNameSpace(e)}}>
                <option className='options'>all</option>
			{DropDownOptions}
                </select>
			  </div>
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
						submitTrace(input.value)
						}}> Submit
						</button>
			</div>
		</div>
	)
}




export default SearchBarCluster;