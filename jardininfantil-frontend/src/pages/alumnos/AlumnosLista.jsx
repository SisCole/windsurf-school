import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  Chip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { alumnoService } from '../api/alumnoService';
import { aulaService } from '../api/aulaService';

const AlumnosLista = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingAlumno, setEditingAlumno] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    id_aula: ''
  });

  useEffect(() => {
    loadAlumnos();
    loadAulas();
  }, []);

  const loadAlumnos = async () => {
    try {
      const data = await alumnoService.getAll();
      setAlumnos(data);
    } catch (err) {
      setError('Error al cargar los alumnos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAulas = async () => {
    try {
      const data = await aulaService.getAll();
      setAulas(data);
    } catch (err) {
      console.error('Error al cargar las aulas:', err);
    }
  };

  const handleOpen = (alumno = null) => {
    if (alumno) {
      setEditingAlumno(alumno);
      setFormData({
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        fecha_nacimiento: alumno.fecha_nacimiento,
        id_aula: alumno.id_aula || ''
      });
    } else {
      setEditingAlumno(null);
      setFormData({
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        id_aula: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAlumno(null);
    setFormData({
      nombre: '',
      apellido: '',
      fecha_nacimiento: '',
      id_aula: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAlumno) {
        await alumnoService.update(editingAlumno.id, formData);
      } else {
        await alumnoService.create(formData);
      }
      handleClose();
      loadAlumnos();
    } catch (err) {
      setError('Error al guardar el alumno');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este alumno?')) {
      try {
        await alumnoService.delete(id);
        loadAlumnos();
      } catch (err) {
        setError('Error al eliminar el alumno');
        console.error('Error:', err);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <Container>
        <Typography>Cargando alumnos...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Gestión de Alumnos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Nuevo Alumno
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Aula</TableCell>
              <TableCell>Profesor</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno) => (
              <TableRow key={alumno.id}>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.apellido}</TableCell>
                <TableCell>{alumno.edad} años</TableCell>
                <TableCell>{alumno.nombre_aula || 'Sin asignar'}</TableCell>
                <TableCell>{alumno.profesor_principal || 'Sin asignar'}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(alumno)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(alumno.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingAlumno ? 'Editar Alumno' : 'Nuevo Alumno'}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="nombre"
              label="Nombre"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="apellido"
              label="Apellido"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="fecha_nacimiento"
              label="Fecha de Nacimiento"
              type="date"
              fullWidth
              variant="outlined"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              name="id_aula"
              label="Aula"
              select
              fullWidth
              variant="outlined"
              value={formData.id_aula}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Sin asignar</em>
              </MenuItem>
              {aulas.map((aula) => (
                <MenuItem key={aula.id} value={aula.id}>
                  {aula.nombre_aula}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingAlumno ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default AlumnosLista;
