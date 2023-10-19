import { Routes as BrowserRoutes, Route } from 'react-router-dom';

import { Home } from './Home';

function Routes() {
  return (
    <BrowserRoutes>
      <Route path="/" Component={Home} />
    </BrowserRoutes>
  );
}

export { Routes };
