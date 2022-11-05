
import React, {useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { selectSourceMap, ViewType } from './sourceMapSlice'
import SearchBarTrace from './SearchBarTrace';
import SearchBarCluster from './SearchBarCluster';
import '../styles/searchBar.scss';

const SearchBar = (props:any) => {
	

	const dispatch = useAppDispatch();
  const type = useAppSelector(selectSourceMap);
  



  const viewType = useAppSelector(selectSourceMap);

  if(viewType === ViewType.cluster) {
    return (
      <SearchBarCluster />
    )
  }
  else if (viewType === ViewType.trace) {
    return (
      <SearchBarTrace />
    )
  }
  else {
    return (
      <SearchBarTrace />
    )
  }

}



export default SearchBar;
