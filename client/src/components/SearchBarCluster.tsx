import React, { JSXElementConstructor, useEffect } from 'react';
import { selectSourceMap, ViewType, changeView } from './sourceMapSlice';
import { getTraceViewInfo, selectNameSpace } from './searchBarSlice';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { trace } from 'console';
import { getTraceDataAsync } from './traceViewSlice';
import { selectCluster, updateNameSpace } from './clusterViewSlice';
import '../styles/searchBar.scss';
import logo from '../../../images/konstellation-logo.png';

const SearchBarCluster = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector(selectCluster);

  const submitTrace = (traceId: string): any => {
    dispatch(changeView({ type: 1 }));
    dispatch(getTraceDataAsync(traceId));
    dispatch(getTraceViewInfo(traceId));
    return;
  };

  //handles changing the namespace state
  const changeNameSpace = (e: any) => {
    dispatch(updateNameSpace(e.target.value));
  };

  //populates the dropdown menu with namespaces
  //adds only the namespace elements to the array
  const DropDownOptions: React.ReactElement[] = [];
  const nameSpaceData = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].data.type === 'namespace') {
      nameSpaceData.push(data[i].data.id);
    }
  }

  nameSpaceData.forEach((element) => {
    DropDownOptions.push(
      <option className="options" key={'search' + element}>
        {element}
      </option>
    );
  });

  return (
    <div className="searchBar">
      <img id="logo" src={logo}></img>
      <div id="namespaceDropDown">
        <div id="namespaceText">Namespace:</div>
        <div className="dropdown">
          <select
            className="dropDownOptions"
            required
            onChange={(e) => {
              changeNameSpace(e);
            }}
          >
            <option className="options">all</option>
            {DropDownOptions}
          </select>
        </div>
      </div>
      <div id="searchBar">
        <span id="searchText">Search:</span>
        <input
          id="searchBarInput"
          type="text"
          name="traceID"
          placeholder="Enter TraceID,  node,  pod,  or service name"
        />
        <button
          id="submitButton"
          onClick={() => {
            const input = document.getElementById(
              'searchBarInput'
            ) as HTMLInputElement;
            submitTrace(input.value);
          }}
        >
          {' '}
          Submit
        </button>
      </div>
    </div>
  );
};

export default SearchBarCluster;
