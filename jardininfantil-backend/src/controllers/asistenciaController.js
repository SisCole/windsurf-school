const pool = require('../config/db');

// Obtener asistencia de un aula en una fecha específica
const getAsistenciaByAulaAndFecha = async (req, res) => {
    try {
        const { id_aula, fecha } = req.params;

        // Validar formato de fecha (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(fecha)) {
            return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
        }

        const [rows] = await pool.execute(`
            SELECT a.id, a.nombre, a.apellido,
                   COALESCE(asi.estado, 'No registrado') as estado,
                   asi.fecha
            FROM alumnos a
            LEFT JOIN aulas au ON a.id_aula = au.id
            LEFT JOIN asistencia asi ON a.id = asi.id_alumno AND asi.fecha = ?
            WHERE au.id = ?
            ORDER BY a.apellido, a.nombre
        `, [fecha, id_aula]);

        res.json(rows);
    } catch (error) {
        console.error('Error al obtener asistencia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Registrar o actualizar asistencia (UPSERT)
const upsertAsistencia = async (req, res) => {
    try {
        const { fecha, asistencias } = req.body;

        // Validar datos requeridos
        if (!fecha || !Array.isArray(asistencias) || asistencias.length === 0) {
            return res.status(400).json({
                error: 'Fecha y array de asistencias son requeridos'
            });
        }

        // Validar formato de fecha
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(fecha)) {
            return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
        }

        // Validar cada registro de asistencia
        for (const asistencia of asistencias) {
            if (!asistencia.id_alumno || !asistencia.estado) {
                return res.status(400).json({
                    error: 'Cada registro debe tener id_alumno y estado'
                });
            }
            if (!['Presente', 'Ausente'].includes(asistencia.estado)) {
                return res.status(400).json({
                    error: 'Estado debe ser "Presente" o "Ausente"'
                });
            }
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Usar UPSERT (INSERT ... ON DUPLICATE KEY UPDATE)
            for (const asistencia of asistencias) {
                await connection.execute(`
                    INSERT INTO asistencia (id_alumno, fecha, estado)
                    VALUES (?, ?, ?)
                    ON DUPLICATE KEY UPDATE estado = VALUES(estado)
                `, [asistencia.id_alumno, fecha, asistencia.estado]);
            }

            await connection.commit();
            res.json({ message: 'Asistencia registrada exitosamente' });

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }

    } catch (error) {
        console.error('Error al registrar asistencia:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW') {
            res.status(400).json({ error: 'Uno o más alumnos no existen' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = {
    getAsistenciaByAulaAndFecha,
    upsertAsistencia
};
