# JardinInfantilPRO - Backend

Backend API para el sistema de gestión de jardín infantil desarrollado con Node.js, Express.js y MySQL.

## Características

- **API RESTful** completa para la gestión de alumnos, aulas, tutores, profesores, asistencia e informes
- **Base de datos MySQL** con pool de conexiones para mejor rendimiento
- **Operaciones CRUD** completas para todos los módulos
- **UPSERT** para asistencia e informes diarios
- **Validación de datos** y manejo de errores
- **CORS** habilitado para desarrollo frontend

## Tecnologías

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MySQL2** - Cliente MySQL con soporte de promesas
- **CORS** - Para peticiones cross-origin
- **Dotenv** - Para variables de entorno

## Requisitos Previos

- Node.js >= 16.0.0
- MySQL Server
- npm >= 8.0.0

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd jardininfantil-backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_secreta
DB_DATABASE=jardin_infantil_db
PORT=4000
NODE_ENV=development
```

4. Asegúrate de que la base de datos MySQL esté ejecutándose y crea la base de datos:
```sql
CREATE DATABASE IF NOT EXISTS jardin_infantil_db;
```

5. Ejecuta el script SQL proporcionado en la documentación para crear las tablas y datos de ejemplo.

## Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:4000`

## Endpoints de la API

### Alumnos
- `GET /api/alumnos` - Obtener todos los alumnos
- `GET /api/alumnos/:id` - Obtener alumno por ID
- `POST /api/alumnos` - Crear nuevo alumno
- `PUT /api/alumnos/:id` - Actualizar alumno
- `DELETE /api/alumnos/:id` - Eliminar alumno

### Aulas
- `GET /api/aulas` - Obtener todas las aulas
- `GET /api/aulas/:id` - Obtener aula por ID
- `POST /api/aulas` - Crear nueva aula
- `PUT /api/aulas/:id` - Actualizar aula
- `DELETE /api/aulas/:id` - Eliminar aula

### Tutores
- `GET /api/tutores` - Obtener todos los tutores
- `GET /api/tutores/:id` - Obtener tutor por ID
- `POST /api/tutores` - Crear nuevo tutor
- `PUT /api/tutores/:id` - Actualizar tutor
- `DELETE /api/tutores/:id` - Eliminar tutor

### Profesores
- `GET /api/profesores` - Obtener todos los profesores
- `GET /api/profesores/:id` - Obtener profesor por ID
- `POST /api/profesores` - Crear nuevo profesor
- `PUT /api/profesores/:id` - Actualizar profesor
- `DELETE /api/profesores/:id` - Eliminar profesor

### Asistencia
- `GET /api/asistencia/aula/:id_aula/fecha/:fecha` - Obtener asistencia por aula y fecha
- `POST /api/asistencia` - Registrar/actualizar asistencia

### Informes
- `GET /api/informes/alumno/:id_alumno/fecha/:fecha` - Obtener informe por alumno y fecha
- `POST /api/informes` - Crear/actualizar informe diario

### Utilidades
- `GET /api/health` - Verificar estado del servidor

## Estructura del Proyecto

```
jardininfantil-backend/
├── src/
│   ├── config/
│   │   └── db.js              # Configuración de MySQL
│   ├── controllers/
│   │   ├── alumnoController.js
│   │   ├── aulaController.js
│   │   ├── asistenciaController.js
│   │   ├── informeController.js
│   │   ├── tutorController.js
│   │   └── profesorController.js
│   ├── routes/
│   │   ├── alumnos.js
│   │   ├── aulas.js
│   │   ├── asistencia.js
│   │   ├── informes.js
│   │   ├── tutores.js
│   │   └── profesores.js
│   └── index.js               # Punto de entrada
├── .env                       # Variables de entorno
└── package.json
```

## Manejo de Errores

El API incluye manejo de errores global con respuestas JSON apropiadas:
- Errores de validación (400)
- Recursos no encontrados (404)
- Errores del servidor (500)

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
