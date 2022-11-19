import React from 'react';
import '../style.css';
import Home from './components/home';

/**
 * Parent-level Component. Designed to conditionally-render "central hub" pages from which many features can be accessed.
 */
const App = () => {
  return (
    <div className="home">
      <Home />
    </div>
  );
};

export default App;
