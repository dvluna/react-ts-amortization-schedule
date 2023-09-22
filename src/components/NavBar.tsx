import React from 'react';
import {
  AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavMenu } from '../NavMenuContext';
import { useNavigate } from 'react-router-dom';

type NavMenuItem = {
  label: string;
  to: string;
};

const NavBar = () => {
  const { isOpen, toggleIsOpen } = useNavMenu();

  const navigate = useNavigate();

  const navMenuItems: NavMenuItem[] = [
    {
      label: `Home`,
      to: `/`
    }
  ];

  const handleNavigation = (path: string) => () => {
    navigate(path);
  };

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
        <Box sx={{ width: 250 }} onClick={toggleIsOpen} onKeyDown={toggleIsOpen}>
          <List>
            {navMenuItems.map((navMenuItem) => (
              <ListItem key={navMenuItem.label} disablePadding>
                <ListItemButton onClick={handleNavigation(navMenuItem.to)}>
                  <ListItemText primary={navMenuItem.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
};

export { NavBar };
