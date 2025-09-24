const pool = require('../config/db');

// Obtener todos los alumnos con información adicional
const getAllAlumnos = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT a.id, a.nombre, a.apellido, a.fecha_nacimiento,
                   TIMESTAMPDIFF(YEAR, a.fecha_nacimiento, CURDATE()) as edad,
                   au.nombre_aula, p.nombre as profesor_principal
            FROM alumnos a
            LEFT JOIN aulas au ON a.id_aula = au.id
            LEFT JOIN profesores p ON au.id_profesor_principal = p.id
            ORDER BY a.apellido, a.nombre
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener alumnos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un alumno por ID
const getAlumnoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute(`
            SELECT a.id, a.nombre, a.apellido, a.fecha_nacimiento,
                   TIMESTAMPDIFF(YEAR, a.fecha_nacimiento, CURDATE()) as edad,
                   a.id_aula, au.nombre_aula, p.nombre as profesor_principal
            FROM alumnos a
            LEFT JOIN aulas au ON a.id_aula = au.id
            LEFT JOIN profesores p ON au.id_profesor_principal = p.id
            WHERE a.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener alumno:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear un nuevo alumno
const createAlumno = async (req, res) => {
    try {
        const { nombre, apellido, fecha_nacimiento, id_aula } = req.body;

        // Validar datos requeridos
        if (!nombre || !apellido || !fecha_nacimiento) {
            return res.status(400).json({
                error: 'Nombre, apellido y fecha de nacimiento son requeridos'
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO alumnos (nombre, apellido, fecha_nacimiento, id_aula) VALUES (?, ?, ?, ?)',
            [nombre, apellido, fecha_nacimiento, id_aula || null]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Alumno creado exitosamente'
        });
    } catch (error) {
        console.error('Error al crear alumno:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Ya existe un alumno con estos datos' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

// Actualizar un alumno
const updateAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, fecha_nacimiento, id_aula } = req.body;

        // Validar datos requeridos
        if (!nombre || !apellido || !fecha_nacimiento) {
            return res.status(400).json({
                error: 'Nombre, apellido y fecha de nacimiento son requeridos'
            });
        }

        const [result] = await pool.execute(
            'UPDATE alumnos SET nombre = ?, apellido = ?, fecha_nacimiento = ?, id_aula = ? WHERE id = ?',
            [nombre, apellido, fecha_nacimiento, id_aula, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        res.json({ message: 'Alumno actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar alumno:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un alumno
const deleteAlumno = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute('DELETE FROM alumnos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        res.json({ message: 'Alumno eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar alumno:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllAlumnos,
    getAlumnoById,
    createAlumno,
    updateAlumno,
    deleteAlumno
};
