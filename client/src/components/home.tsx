import React from 'react'
import SourceMap from './sourceMap'
import Footer from './traceTableButton'
import '../styles/home.scss'

type Props = {}

const home  = (props: Props) => {
  return (
    <>
      <SourceMap />
      <Footer />
    </>
  )
}

export default home