import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>
);
