
import React, {useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { selectSourceMap, ViewType } from './sourceMapSlice'
import SearchBarTrace from './SearchBarTrace';
import SearchBarCluster from './SearchBarCluster';
import '../styles/searchBar.scss';

const SearchBar = (props:any) => {
	

	const dispatch = useAppDispatch();
  const viewType = useAppSelector(selectSourceMap);
  



	const view = viewType.type === ViewType.cluster ? <SearchBarCluster /> : <SearchBarTrace />


    return (
			<>
      <div className='searchBarContainer'>
        {view}
      </div>
    </>
    )
  

}



export default SearchBar;
