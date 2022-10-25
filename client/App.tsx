import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import VisualizerTab from './components/VisualizerTab';
import './style.css';
import TraceTester from './components/TraceTester';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <TraceTester />
        {/* <CssBaseline />
        <VisualizerTab /> */}
      </ThemeProvider>
    </div>
  );
};

export default App;
