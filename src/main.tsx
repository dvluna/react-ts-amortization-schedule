import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { BaselineStyleWrapper } from './StyleWrapper';
import { AppContextProvider } from './AppContext';

const darkTheme = createTheme({
  palette: {
    mode: `dark`,
    primary: {
      main: `#E0E0E0`,
      dark: `#616161`,
      contrastText: `#EEE`,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: `#424242`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginRight: 12,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById(`root`)!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BaselineStyleWrapper>
        <ThemeProvider theme={darkTheme}>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </ThemeProvider>
      </BaselineStyleWrapper>
    </BrowserRouter>
  </React.StrictMode>,
);
