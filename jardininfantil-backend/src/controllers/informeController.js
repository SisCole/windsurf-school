const pool = require('../config/db');

// Obtener informe diario de un alumno en una fecha específica
const getInformeByAlumnoAndFecha = async (req, res) => {
    try {
        const { id_alumno, fecha } = req.params;

        // Validar formato de fecha
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(fecha)) {
            return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
        }

        const [rows] = await pool.execute(`
            SELECT id.id, id.id_alumno, id.fecha, id.estado_animo,
                   id.almuerzo, id.siesta_horas, id.notas,
                   a.nombre, a.apellido
            FROM informes_diarios id
            JOIN alumnos a ON id.id_alumno = a.id
            WHERE id.id_alumno = ? AND id.fecha = ?
        `, [id_alumno, fecha]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Informe no encontrado para esta fecha' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener informe:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear o actualizar informe diario (UPSERT)
const upsertInforme = async (req, res) => {
    try {
        const { id_alumno, fecha, estado_animo, almuerzo, siesta_horas, notas } = req.body;

        // Validar datos requeridos
        if (!id_alumno || !fecha) {
            return res.status(400).json({
                error: 'ID del alumno y fecha son requeridos'
            });
        }

        // Validar formato de fecha
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(fecha)) {
            return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
        }

        // Validar campos opcionales si se proporcionan
        const estadosAnimoValidos = ['Feliz', 'Tranquilo', 'Irritable', 'Somnoliento'];
        const almuerzosValidos = ['Comió todo', 'Comió bien', 'Comió poco', 'No comió'];

        if (estado_animo && !estadosAnimoValidos.includes(estado_animo)) {
            return res.status(400).json({
                error: 'Estado de ánimo debe ser uno de: ' + estadosAnimoValidos.join(', ')
            });
        }

        if (almuerzo && !almuerzosValidos.includes(almuerzo)) {
            return res.status(400).json({
                error: 'Almuerzo debe ser uno de: ' + almuerzosValidos.join(', ')
            });
        }

        if (siesta_horas && (isNaN(siesta_horas) || siesta_horas < 0 || siesta_horas > 24)) {
            return res.status(400).json({
                error: 'Horas de siesta debe ser un número entre 0 y 24'
            });
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Usar UPSERT (INSERT ... ON DUPLICATE KEY UPDATE)
            await connection.execute(`
                INSERT INTO informes_diarios (id_alumno, fecha, estado_animo, almuerzo, siesta_horas, notas)
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    estado_animo = VALUES(estado_animo),
                    almuerzo = VALUES(almuerzo),
                    siesta_horas = VALUES(siesta_horas),
                    notas = VALUES(notas)
            `, [id_alumno, fecha, estado_animo || null, almuerzo || null, siesta_horas || null, notas || null]);

            await connection.commit();
            res.json({ message: 'Informe diario guardado exitosamente' });

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }

    } catch (error) {
        console.error('Error al guardar informe:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW') {
            res.status(400).json({ error: 'El alumno especificado no existe' });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = {
    getInformeByAlumnoAndFecha,
    upsertInforme
};
