import React from 'react';
import { BrowserRouter, Routes as BrowserRoutes, Route } from 'react-router-dom';

import { Home } from './Home';

function Routes() {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" Component={Home} />
      </BrowserRoutes>
    </BrowserRouter>
  );
}

export { Routes };
