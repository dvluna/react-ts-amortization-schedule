import React from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppContext, useNavMenu } from '../AppContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { isNavMenuOpen, navMenuItems } = useAppContext();
  const { toggleNavMenu } = useNavMenu();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => () => {
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleNavMenu}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isNavMenuOpen} onClose={toggleNavMenu}>
        <Box sx={{ width: 250 }} onClick={toggleNavMenu} onKeyDown={toggleNavMenu}>
          <List>
            {navMenuItems.map((navMenuItem) => (
              <ListItem key={navMenuItem.label} disablePadding={true}>
                <ListItemButton onClick={handleNavigation(navMenuItem.to)}>
                  <ListItemText primary={navMenuItem.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export { NavBar };
