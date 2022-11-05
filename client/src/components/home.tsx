import React from 'react'
import SourceMap from './sourceMap'
import Footer from './footer'
import '../styles/home.scss'

type Props = {}

const home  = (props: Props) => {

  return (
    <>
      <SourceMap />
      <div className="home__overlay">
        <Footer />
      </div>
    </>
  )
}

export default home