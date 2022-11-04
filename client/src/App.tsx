import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import VisualizerTab from './components/visualizerTab';
import '../style.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const props = {
    backgroundColor: 'blue'
  }


  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        {/* <TraceTester /> */}
        <CssBaseline />
        <VisualizerTab />
      </ThemeProvider>
    </div>
  );
};

export default App;
