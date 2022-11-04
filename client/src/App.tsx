import React from 'react';
import CytoscapeContainer from './components/sourceMap';
import '../style.css';

const App = () => {
  const props = {
    backgroundColor: 'blue'
  }

  return (
    <div>
      <CytoscapeContainer />
    </div>
  );
};

export default App;
