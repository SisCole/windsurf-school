import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import AlumnosLista from './pages/alumnos/AlumnosLista';
import RegistroAsistencia from './pages/asistencia/RegistroAsistencia';
import InformeDiario from './pages/informes/InformeDiario';

// Crear tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1, paddingTop: '20px' }}>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/alumnos" element={<AlumnosLista />} />
              <Route path="/aulas" element={<Navigate to="/alumnos" replace />} />
              <Route path="/tutores" element={<Navigate to="/alumnos" replace />} />
              <Route path="/profesores" element={<Navigate to="/alumnos" replace />} />
              <Route path="/asistencia" element={<RegistroAsistencia />} />
              <Route path="/informes" element={<InformeDiario />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
