import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
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
          <NavBar />
          <Routes />
        </NavMenuContextProvider>
      </ThemeProvider>
    </BaselineStyleWrapper>
  )
}

export { App }
