import React from 'react';
import CytoscapeContainer from './components/sourceMap';
import '../style.css';
import SearchBar from './components/SearchBar';

const App = () => {
  const props = {
    backgroundColor: 'blue'
  }

  return (
    <div>
			<SearchBar />
      <CytoscapeContainer />
    </div>
  );
};

export default App;
