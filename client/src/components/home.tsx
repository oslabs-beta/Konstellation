import React from 'react'
import SourceMap from './sourceMap'
import FooterDrawer from './trace-table/footerDrawer'
import Logout from './logout'
import '../styles/home.scss'
import { useAppSelector } from '../lib/hooks'
import { selectSourceMap, ViewType } from './sourceMapSlice'

/**
 * Primary Application Page which hosts Source Map and essential navigation features
 * @Remarks Serves as an abstraction layer for core application features - can be swapped out app App level for other feature pages as/if needed.
 */
const home  = () => {

  const sourceMap = useAppSelector(selectSourceMap)
  const uiElements: Array<JSX.Element> = [];

  if(sourceMap.type == ViewType.cluster){
    uiElements.push(<div className="overlay" id="trace-table-overlay" key="overlay-1"><FooterDrawer /></div>)
  }

  return (
    <>
      <SourceMap />
      {uiElements}
      <Logout />
    </>
  )
}

export default home