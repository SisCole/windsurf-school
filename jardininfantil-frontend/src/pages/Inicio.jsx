import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Inicio = () => {
  const modules = [
    {
      title: 'Alumnos',
      description: 'Gestionar información de los alumnos, sus tutores y asignaciones',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/alumnos',
      color: '#1976d2'
    },
    {
      title: 'Aulas',
      description: 'Administrar aulas y profesores principales',
      icon: <ClassIcon sx={{ fontSize: 40 }} />,
      path: '/aulas',
      color: '#388e3c'
    },
    {
      title: 'Tutores',
      description: 'Gestionar información de padres y apoderados',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/tutores',
      color: '#f57c00'
    },
    {
      title: 'Profesores',
      description: 'Administrar información del personal docente',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      path: '/profesores',
      color: '#7b1fa2'
    },
    {
      title: 'Asistencia',
      description: 'Registrar y consultar asistencia diaria',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      path: '/asistencia',
      color: '#d32f2f'
    },
    {
      title: 'Informes',
      description: 'Crear y consultar informes diarios de alumnos',
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      path: '/informes',
      color: '#689f38'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <SchoolIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenido a JardinInfantilPRO
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Sistema de gestión integral para jardín infantil
        </Typography>
      </Box>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
        Módulos del Sistema
      </Typography>

      <Grid container spacing={3}>
        {modules.map((module, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: module.color, mb: 2 }}>
                  {module.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {module.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {module.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  component={Link}
                  to={module.path}
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: module.color }}
                >
                  Acceder
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Inicio;
