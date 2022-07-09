import React from 'react';
import './App.scss';
import {
  Routes,
  Route,
} from "react-router-dom";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// pages
import Auth from './view/Auth';
import Pacel from './view/Dashboard/pacel';

function App() {
  const [isLogin, serIsLogin] = React.useState(false)

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });


  return (
    <CacheProvider value={cacheRtl}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/pacel" element={<Pacel />} />
          {/* <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </div >
    </CacheProvider>
  );
}

export default App;
