const pool = require('../config/db');

// Obtener todos los profesores
const getAllProfesores = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT p.id, p.nombre, p.apellido, p.email,
                   a.nombre_aula as aula_principal,
                   COUNT(al.id) as numero_alumnos
            FROM profesores p
            LEFT JOIN aulas a ON p.id = a.id_profesor_principal
            LEFT JOIN alumnos al ON a.id = al.id_aula
            GROUP BY p.id, p.nombre, p.apellido, p.email, a.nombre_aula
            ORDER BY p.apellido, p.nombre
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener un profesor por ID
const getProfesorById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute(`
            SELECT p.id, p.nombre, p.apellido, p.email,
                   a.nombre_aula as aula_principal,
                   COUNT(al.id) as numero_alumnos
            FROM profesores p
            LEFT JOIN aulas a ON p.id = a.id_profesor_principal
            LEFT JOIN alumnos al ON a.id = al.aula
            WHERE p.id = ?
            GROUP BY p.id, p.nombre, p.apellido, p.email, a.nombre_aula
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener profesor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear un nuevo profesor
const createProfesor = async (req, res) => {
    try {
        const { nombre, apellido, email } = req.body;

        // Validar datos requeridos
        if (!nombre || !apellido || !email) {
            return res.status(400).json({
                error: 'Nombre, apellido y email son requeridos'
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO profesores (nombre, apellido, email) VALUES (?, ?, ?)',
            [nombre, apellido, email]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Profesor creado exitosamente'
        });
    } catch (error) {
        console.error('Error al crear profesor:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Ya existe un profesor con este email' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

// Actualizar un profesor
const updateProfesor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email } = req.body;

        // Validar datos requeridos
        if (!nombre || !apellido || !email) {
            return res.status(400).json({
                error: 'Nombre, apellido y email son requeridos'
            });
        }

        const [result] = await pool.execute(
            'UPDATE profesores SET nombre = ?, apellido = ?, email = ? WHERE id = ?',
            [nombre, apellido, email, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }

        res.json({ message: 'Profesor actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar profesor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar un profesor
const deleteProfesor = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute('DELETE FROM profesores WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }

        res.json({ message: 'Profesor eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar profesor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllProfesores,
    getProfesorById,
    createProfesor,
    updateProfesor,
    deleteProfesor
};
