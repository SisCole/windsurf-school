import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/alumnos', label: 'Alumnos' },
    { path: '/aulas', label: 'Aulas' },
    { path: '/tutores', label: 'Tutores' },
    { path: '/profesores', label: 'Profesores' },
    { path: '/asistencia', label: 'Asistencia' },
    { path: '/informes', label: 'Informes' },
  ];

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JardinInfantilPRO
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                variant={isActive(item.path) ? "outlined" : "text"}
                sx={{
                  borderColor: isActive(item.path) ? 'white' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
