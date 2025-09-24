import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid
} from '@mui/material';
import { asistenciaService } from '../api/asistenciaService';
import { aulaService } from '../api/aulaService';
import { format } from 'date-fns';

const RegistroAsistencia = () => {
  const [aulas, setAulas] = useState([]);
  const [selectedAula, setSelectedAula] = useState('');
  const [selectedFecha, setSelectedFecha] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [asistencia, setAsistencia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadAulas();
  }, []);

  useEffect(() => {
    if (selectedAula && selectedFecha) {
      loadAsistencia();
    }
  }, [selectedAula, selectedFecha]);

  const loadAulas = async () => {
    try {
      const data = await aulaService.getAll();
      setAulas(data);
    } catch (err) {
      setError('Error al cargar las aulas');
      console.error('Error:', err);
    }
  };

  const loadAsistencia = async () => {
    setLoading(true);
    try {
      const data = await asistenciaService.getByAulaAndFecha(selectedAula, selectedFecha);
      setAsistencia(data);
    } catch (err) {
      setError('Error al cargar la asistencia');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEstadoChange = (alumnoId, nuevoEstado) => {
    setAsistencia(prev =>
      prev.map(alumno =>
        alumno.id === alumnoId
          ? { ...alumno, estado: nuevoEstado }
          : alumno
      )
    );
  };

  const handleGuardar = async () => {
    try {
      const asistenciasData = asistencia.map(alumno => ({
        id_alumno: alumno.id,
        estado: alumno.estado
      }));

      await asistenciaService.upsert({
        fecha: selectedFecha,
        asistencias: asistenciasData
      });

      setSuccess('Asistencia guardada exitosamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Error al guardar la asistencia');
      console.error('Error:', err);
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Presente':
        return 'success';
      case 'Ausente':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Registro de Asistencia
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Aula</InputLabel>
              <Select
                value={selectedAula}
                label="Aula"
                onChange={(e) => setSelectedAula(e.target.value)}
              >
                <MenuItem value="">
                  <em>Seleccionar aula</em>
                </MenuItem>
                {aulas.map((aula) => (
                  <MenuItem key={aula.id} value={aula.id}>
                    {aula.nombre_aula}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Fecha"
              type="date"
              value={selectedFecha}
              onChange={(e) => setSelectedFecha(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              fullWidth
              onClick={loadAsistencia}
              disabled={!selectedAula || !selectedFecha}
            >
              Cargar Asistencia
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {selectedAula && (
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">
              Alumnos del Aula: {aulas.find(a => a.id === parseInt(selectedAula))?.nombre_aula}
            </Typography>
            <Button
              variant="contained"
              onClick={handleGuardar}
              disabled={loading || asistencia.length === 0}
            >
              Guardar Cambios
            </Button>
          </Box>

          {loading ? (
            <Typography>Cargando asistencia...</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asistencia.map((alumno) => (
                    <TableRow key={alumno.id}>
                      <TableCell>{alumno.nombre}</TableCell>
                      <TableCell>{alumno.apellido}</TableCell>
                      <TableCell>
                        <Chip
                          label={alumno.estado}
                          color={getEstadoColor(alumno.estado)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant={alumno.estado === 'Presente' ? 'contained' : 'outlined'}
                          color="success"
                          onClick={() => handleEstadoChange(alumno.id, 'Presente')}
                          sx={{ mr: 1 }}
                        >
                          Presente
                        </Button>
                        <Button
                          size="small"
                          variant={alumno.estado === 'Ausente' ? 'contained' : 'outlined'}
                          color="error"
                          onClick={() => handleEstadoChange(alumno.id, 'Ausente')}
                        >
                          Ausente
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default RegistroAsistencia;
