import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App'
import { BaselineStyleWrapper } from './StyleWrapper';
import { NavMenuContextProvider } from './NavMenuContext';

const darkTheme = createTheme({
  palette: {
    mode: `dark`,
    primary: {
      main: `#DDD`,
      dark: `#333`,
      contrastText: `#CCC`,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: `#252525`,
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginRight: 12,
        },
      }
    },
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BaselineStyleWrapper>
        <ThemeProvider theme={darkTheme}>
          <NavMenuContextProvider>
            <App />
          </NavMenuContextProvider>
        </ThemeProvider>
      </BaselineStyleWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)
