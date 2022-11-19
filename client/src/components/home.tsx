import React from 'react';
import SourceMap from './sourceMap';
import SearchBar from './SearchBar';
import FooterDrawer from './trace-table/footerDrawer';
import Logout from './logout';
import '../styles/home.scss';
import { useAppSelector } from '../lib/hooks';
import { selectSourceMap, ViewType } from './sourceMapSlice';
import { RenderType, selectSpanMap } from './span-table/spanMapSlice';
import SpanMap from './span-table/spanMap';

/**
 * Primary Application Page which hosts Source Map and essential navigation features
 * @Remarks Serves as an abstraction layer for core application features - can be swapped out app App level 
 * for other feature pages as/if needed.
 */
const home = () => {
  const sourceMap = useAppSelector(selectSourceMap);

  const spanList = useAppSelector(selectSpanMap);

  const uiElements: Array<JSX.Element> = [];

  // Make sure to overwite clickable elements with 'pointer-events: auto'
  if (sourceMap.type == ViewType.cluster) {
    uiElements.push(
      <div className="overlay" id="trace-table-overlay" key="overlay-1">
        <FooterDrawer />
      </div>
    );
    uiElements.push(
      <div
        className="overlay button-container"
        id="logout-button-container"
        key="logout-button"
      >
        <Logout />
      </div>
    );
  }

  if (spanList.type == RenderType.render) {
    uiElements.push(
      <div className="overlaydata" id="span-table-overlay" key="overlay-2">
        <SpanMap />
      </div>
    );
  }

  return (
    <>
      <SearchBar />
      <SourceMap />
      {uiElements}
    </>
  );
};

export default home;
