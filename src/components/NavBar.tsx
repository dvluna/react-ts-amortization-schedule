import React from 'react';
import { AppBar, Box, Drawer, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavMenu } from '../NavMenuContext';

const NavBar = () => {
  const { isOpen, toggleIsOpen } = useNavMenu();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={toggleIsOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isOpen} onClose={toggleIsOpen}>
        Menu Item List goes here...
      </Drawer>
    </Box>
  )
};

export { NavBar };
