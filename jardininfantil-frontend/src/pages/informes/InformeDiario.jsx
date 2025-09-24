import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  TextareaAutosize
} from '@mui/material';
import { informeService } from '../api/informeService';
import { alumnoService } from '../api/alumnoService';
import { format } from 'date-fns';

const InformeDiario = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const [selectedFecha, setSelectedFecha] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [informe, setInforme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    estado_animo: '',
    almuerzo: '',
    siesta_horas: '',
    notas: ''
  });

  useEffect(() => {
    loadAlumnos();
  }, []);

  useEffect(() => {
    if (selectedAlumno && selectedFecha) {
      loadInforme();
    }
  }, [selectedAlumno, selectedFecha]);

  const loadAlumnos = async () => {
    try {
      const data = await alumnoService.getAll();
      setAlumnos(data);
    } catch (err) {
      setError('Error al cargar los alumnos');
      console.error('Error:', err);
    }
  };

  const loadInforme = async () => {
    if (!selectedAlumno) return;

    setLoading(true);
    try {
      const data = await informeService.getByAlumnoAndFecha(selectedAlumno, selectedFecha);
      setInforme(data);
      setFormData({
        estado_animo: data.estado_animo || '',
        almuerzo: data.almuerzo || '',
        siesta_horas: data.siesta_horas || '',
        notas: data.notas || ''
      });
    } catch (err) {
      if (err.response?.status === 404) {
        // No hay informe para esta fecha, es normal
        setInforme(null);
        setFormData({
          estado_animo: '',
          almuerzo: '',
          siesta_horas: '',
          notas: ''
        });
      } else {
        setError('Error al cargar el informe');
        console.error('Error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await informeService.upsert({
        id_alumno: selectedAlumno,
        fecha: selectedFecha,
        ...formData
      });

      setSuccess('Informe guardado exitosamente');
      setTimeout(() => setSuccess(null), 3000);
      loadInforme();
    } catch (err) {
      setError('Error al guardar el informe');
      console.error('Error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const estadosAnimo = ['Feliz', 'Tranquilo', 'Irritable', 'Somnoliento'];
  const opcionesAlmuerzo = ['Comió todo', 'Comió bien', 'Comió poco', 'No comió'];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Informe Diario del Alumno
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Alumno</InputLabel>
              <Select
                value={selectedAlumno}
                label="Alumno"
                onChange={(e) => setSelectedAlumno(e.target.value)}
              >
                <MenuItem value="">
                  <em>Seleccionar alumno</em>
                </MenuItem>
                {alumnos.map((alumno) => (
                  <MenuItem key={alumno.id} value={alumno.id}>
                    {alumno.nombre} {alumno.apellido}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
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
        </Grid>
      </Paper>

      {selectedAlumno && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Informe de: {alumnos.find(a => a.id === parseInt(selectedAlumno))?.nombre} {alumnos.find(a => a.id === parseInt(selectedAlumno))?.apellido}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Estado de Ánimo</InputLabel>
                  <Select
                    name="estado_animo"
                    value={formData.estado_animo}
                    label="Estado de Ánimo"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Seleccionar</em>
                    </MenuItem>
                    {estadosAnimo.map((estado) => (
                      <MenuItem key={estado} value={estado}>
                        {estado}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Almuerzo</InputLabel>
                  <Select
                    name="almuerzo"
                    value={formData.almuerzo}
                    label="Almuerzo"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Seleccionar</em>
                    </MenuItem>
                    {opcionesAlmuerzo.map((opcion) => (
                      <MenuItem key={opcion} value={opcion}>
                        {opcion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="siesta_horas"
                  label="Horas de Siesta"
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={formData.siesta_horas}
                  onChange={handleChange}
                  helperText="Ej: 1.5 para una hora y media"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="notas"
                  label="Notas para los Padres"
                  multiline
                  rows={4}
                  value={formData.notas}
                  onChange={handleChange}
                  placeholder="Observaciones importantes del día..."
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {informe ? 'Actualizar Informe' : 'Guardar Informe'}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => loadInforme()}
                    disabled={loading}
                  >
                    Recargar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default InformeDiario;
