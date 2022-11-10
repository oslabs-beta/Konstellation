import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './Login';

// Global interface so any react component can access Electron's API
// specified in /electron/preload.js
declare global {
  interface Window {
    electronAPI: any;
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
