import React from 'react';
import { NavBar } from './components/NavBar';

import { useNavMenu } from './AppContext';
import { Routes } from './Routes';

const App = () => {
  const { setNavMenuItems } = useNavMenu();

  setNavMenuItems([
    {
      label: `Home`,
      to: `/`,
    },
  ]);

  return (
    <>
      <NavBar />
      <Routes />
    </>
  );
};

export { App };
