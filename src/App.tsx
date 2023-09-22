import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './Routes';
import { NavBar } from './components/NavBar';
import { BaselineStyleWrapper } from './StyleWrapper';
import { NavMenuContextProvider } from './NavMenuContext';

const darkTheme = createTheme({
  palette: {
    mode: `dark`
  },
});

const App = () => {
  return (
    <BaselineStyleWrapper>
      <ThemeProvider theme={darkTheme}>
        <NavMenuContextProvider>
          <BrowserRouter>
            <NavBar />
            <Routes />
          </BrowserRouter>
        </NavMenuContextProvider>
      </ThemeProvider>
    </BaselineStyleWrapper>
  )
}

export { App }
