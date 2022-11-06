import React, { JSXElementConstructor, useEffect } from 'react';
import { selectSourceMapType, ViewType } from './sourceMapSlice'
import {getNamespaceAsync, selectNameSpace, getTraceAsync} from './searchBarSlice'
import { useAppSelector, useAppDispatch } from '../lib/hooks';
//import logo from './konstellation-logo.png';


const SearchBarCluster = ():JSX.Element => {

//need to grab the namespaces and st it as stat here
  const namespaceData = useAppSelector(selectNameSpace);
	const dispatch = useAppDispatch();


  const submitTrace = (traceID?:any):any => {
    //sends a fetch request to the api to get the data from a particular trace
		//changes the state from cluster to trace view
		
		console.log(traceID);
		dispatch(getTraceAsync(traceID))
		
		
		return

	}

//remove fake data later
const fakeData = ['default', 'jon', 'demo']


//populates the dropdown menu with namespaces
const DropDownOptions: React.ReactElement[] =[]

fakeData.forEach(element => {
	DropDownOptions.push (<option className='options'>{element}</option>)
})


return (
		<div className="searchBar">
			<div id='logo'>
				logo here
			</div>
			<div id="namespaceDropDown">
				<div id="namespaceText">
			  namespace:
				</div>
			  <div className="dropdown">
                <select className='dropDownOptions'required>
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
						}}> submit
					</button>
			</div>
		</div>
	)
}


/* <option value="photospot">Photospot</option>
<option value="food">Food</option>
<option value="hiking">Hiking</option>
<option value="other">Other</option> */

export default SearchBarCluster;