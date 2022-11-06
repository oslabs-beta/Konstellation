import React, { JSXElementConstructor, useEffect } from 'react';
import { selectSourceMapType, updateData, ViewType } from './sourceMapSlice'
import {getNamespaceAsync, selectNameSpace} from './searchBarSlice'
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { trace } from 'console';
//import logo from './konstellation-logo.png';


const SearchBarCluster = ():JSX.Element => {

//need to grab the namespaces and st it as stat here
  const namespaceData = useAppSelector(selectNameSpace);
	const dispatch = useAppDispatch();


  const submitTrace = (traceID?:string | undefined):any => {
    //sends a fetch request to the api to get the data from a particular trace
		//changes the state from cluster to trace view
		
		console.log(traceID);
		//this is an either or
		//either make the fetch request to the server or
		//dispatch(getTraceAsync(traceID))

		//update view so that the data property is updated to the inputted trace view.
		dispatch(updateData({type: 1, data:traceID}))

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