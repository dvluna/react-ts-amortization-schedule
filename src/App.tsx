import { NavBar } from './components/NavBar';

import { useSetNavMenuItems } from './NavMenuContext';
import { Routes } from './Routes';

const App = () => {
  useSetNavMenuItems([
    {
      label: `Home`,
      to: `/`
    }
  ]);

  return (
    <>
      <NavBar />
      <Routes />
    </>
  )
}

export { App }
