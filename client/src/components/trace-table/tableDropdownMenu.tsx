import React, { JSXElementConstructor, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { getTraceTableDataAsync, updateService, selectService, getServicesAsync, getAllServices, selectLookback } from './tableListSlice';

const tableDropDownMenu = ():JSX.Element => {
  
  const dispatch = useAppDispatch();
  const activeLookback = useAppSelector(selectLookback);
  //hands changing the services state
	const changeService = (e:any) => {

		//this should call the dispatch to change the active service
		dispatch(updateService(e.target.value));
		dispatch(getTraceTableDataAsync({activeService:e.target.value, lookback:activeLookback}))
		//then call the async function to get table data passing in the new service value.
		return
	}

	//populates the dropdown menu with services
	const DropDownOptions: React.ReactElement[] =[]
	const servicesData = useAppSelector(getAllServices)

	useEffect(() => {
    if(servicesData.length === 0) {
      dispatch(getServicesAsync());
    }
  },[])

	useEffect(() => {
    //update the active service to servicesdata[0];
    dispatch(updateService(servicesData[0]));
  },[servicesData])

		servicesData.forEach(element => {
			DropDownOptions.push (<option className='options' key={'table'+ element}>{element}</option>)
		})


	return (
		<div>
			  <div className="dropdown">
          <select className='dropDownOptions'required onChange={(e)=>{changeService(e)}}>           
			     {DropDownOptions}
          </select>
			  </div>
		</div>
	)
}


export default tableDropDownMenu;