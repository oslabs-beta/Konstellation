import React from 'react'
import SourceMap from './sourceMap'
import FooterDrawer from './trace-table/footerDrawer'
import Logout from './logout'
import '../styles/home.scss'

/**
 * Primary Application Page which hosts Source Map and essential navigation features
 * @Remarks Serves as an abstraction layer for core application features - can be swapped out app App level for other feature pages as/if needed.
 */
const home  = () => {

  return (
    <>
      <SourceMap />
      <Logout />
      <div className="overlay" id="trace-table-overlay">
        <FooterDrawer />
      </div>
    </>
  )
}

export default home