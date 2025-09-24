const pool = require('../config/db');

// Obtener todas las aulas con información adicional
const getAllAulas = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT a.id, a.nombre_aula,
                   p.nombre as profesor_principal,
                   p.apellido as apellido_profesor,
                   COUNT(al.id) as numero_alumnos
            FROM aulas a
            LEFT JOIN profesores p ON a.id_profesor_principal = p.id
            LEFT JOIN alumnos al ON a.id = al.id_aula
            GROUP BY a.id, a.nombre_aula, p.nombre, p.apellido
            ORDER BY a.nombre_aula
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener aulas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener una aula por ID
const getAulaById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute(`
            SELECT a.id, a.nombre_aula,
                   p.nombre as profesor_principal,
                   p.apellido as apellido_profesor,
                   COUNT(al.id) as numero_alumnos
            FROM aulas a
            LEFT JOIN profesores p ON a.id_profesor_principal = p.id
            LEFT JOIN alumnos al ON a.id = al.id_aula
            WHERE a.id = ?
            GROUP BY a.id, a.nombre_aula, p.nombre, p.apellido
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Aula no encontrada' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener aula:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear una nueva aula
const createAula = async (req, res) => {
    try {
        const { nombre_aula, id_profesor_principal } = req.body;

        // Validar datos requeridos
        if (!nombre_aula) {
            return res.status(400).json({
                error: 'Nombre del aula es requerido'
            });
        }

        const [result] = await pool.execute(
            'INSERT INTO aulas (nombre_aula, id_profesor_principal) VALUES (?, ?)',
            [nombre_aula, id_profesor_principal || null]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Aula creada exitosamente'
        });
    } catch (error) {
        console.error('Error al crear aula:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Ya existe un aula con este nombre' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

// Actualizar una aula
const updateAula = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_aula, id_profesor_principal } = req.body;

        // Validar datos requeridos
        if (!nombre_aula) {
            return res.status(400).json({
                error: 'Nombre del aula es requerido'
            });
        }

        const [result] = await pool.execute(
            'UPDATE aulas SET nombre_aula = ?, id_profesor_principal = ? WHERE id = ?',
            [nombre_aula, id_profesor_principal, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aula no encontrada' });
        }

        res.json({ message: 'Aula actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar aula:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Eliminar una aula
const deleteAula = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el aula tiene alumnos asignados
        const [alumnos] = await pool.execute(
            'SELECT COUNT(*) as count FROM alumnos WHERE id_aula = ?',
            [id]
        );

        if (alumnos[0].count > 0) {
            return res.status(400).json({
                error: 'No se puede eliminar el aula porque tiene alumnos asignados'
            });
        }

        const [result] = await pool.execute('DELETE FROM aulas WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aula no encontrada' });
        }

        res.json({ message: 'Aula eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar aula:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllAulas,
    getAulaById,
    createAula,
    updateAula,
    deleteAula
};
