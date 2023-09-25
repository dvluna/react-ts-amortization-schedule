import React from 'react';
import { Routes as BrowserRoutes, Route } from 'react-router-dom';

import { NavBar } from './components/NavBar';

import { useSetNavMenuItems } from './NavMenuContext';
import { Home } from './Home';

function Routes() {

  useSetNavMenuItems([
    {
      label: `Home`,
      to: `/`
    }
  ]);

  return (<>

    <NavBar />
    <BrowserRoutes>
      <Route path="/" Component={Home} />
    </BrowserRoutes>
  </>

  );
}

export { Routes };
