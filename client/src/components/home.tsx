import React from 'react'
import SourceMap from './sourceMap'
import SearchBar from './SearchBar';

type Props = {}

const home = (props: Props) => {
  return (
    <div>
			<SearchBar/>
      <SourceMap />
    </div>
  )
}

export default home