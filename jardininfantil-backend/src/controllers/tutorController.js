const pool = require('../config/db');

// Obtener todos los tutores
const getAllTutores = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT t.id, t.nombre, t.apellido, t.email, t.telefono, t.relacion,
                   GROUP_CONCAT(CONCAT(a.nombre, ' ', a.apellido) SEPARATOR ', ') as alumnos_asociados
            FROM tutores t
            LEFT JOIN alumnos_tutores at ON t.id = at.id_tutor
            LEFT JOIN alumnos a ON at.id_alumno = a.id
            GROUP BY t.id, t.nombre, t.apellido, t.email, t.telefono, t.relacion
            ORDER BY t.apellido, t.nombre
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener tutores:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un tutor por ID
const getTutorById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute(`
            SELECT t.id, t.nombre, t.apellido, t.email, t.telefono, t.relacion,
                   GROUP_CONCAT(CONCAT(a.nombre, ' ', a.apellido) SEPARATOR ', ') as alumnos_asociados
            FROM tutores t
            LEFT JOIN alumnos_tutores at ON t.id = at.id_tutor
            LEFT JOIN alumnos a ON at.id_alumno = a.id
            WHERE t.id = ?
            GROUP BY t.id, t.nombre, t.apellido, t.email, t.telefono, t.relacion
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Tutor no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener tutor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear un nuevo tutor
const createTutor = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, relacion } = req.body;

        // Validar datos requeridos
        if (!nombre || !apellido || !email) {
            return res.status(400).json({
                error: 'Nombre, apellido y email son requeridos'
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO tutores (nombre, apellido, email, telefono, relacion) VALUES (?, ?, ?, ?, ?)',
            [nombre, apellido, email, telefono || null, relacion || null]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Tutor creado exitosamente'
        });
    } catch (error) {
        console.error('Error al crear tutor:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Ya existe un tutor con este email' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

// Actualizar un tutor
const updateTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, telefono, relacion } = req.body;

        // Validar datos requeridos
        if (!nombre || !apellido || !email) {
            return res.status(400).json({
                error: 'Nombre, apellido y email son requeridos'
            });
        }

        const [result] = await pool.execute(
            'UPDATE tutores SET nombre = ?, apellido = ?, email = ?, telefono = ?, relacion = ? WHERE id = ?',
            [nombre, apellido, email, telefono, relacion, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tutor no encontrado' });
        }

        res.json({ message: 'Tutor actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar tutor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un tutor
const deleteTutor = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute('DELETE FROM tutores WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tutor no encontrado' });
        }

        res.json({ message: 'Tutor eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar tutor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllTutores,
    getTutorById,
    createTutor,
    updateTutor,
    deleteTutor
};
