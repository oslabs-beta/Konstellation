import React from 'react'
import SourceMap from './sourceMap'
import FooterDrawer from './footerDrawer'
import '../styles/home.scss'

type Props = {}

const home  = (props: Props) => {

  return (
    <>
      <SourceMap />
      <div className="home__overlay">
        <FooterDrawer />
      </div>
    </>
  )
}

export default home