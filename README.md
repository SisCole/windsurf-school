# JardinInfantilPRO - Sistema de Gestión de Jardín Infantil

Un sistema completo para la gestión de jardines infantiles desarrollado con tecnologías web modernas.

## 🚀 Características

- **Gestión completa de alumnos** con información personal y asignaciones
- **Control de aulas y profesores** con capacidades y asignaciones
- **Registro de tutores** (padres/apoderados) con relaciones familiares
- **Sistema de asistencia diaria** con registro por aula y fecha
- **Informes diarios personalizados** con seguimiento del desarrollo infantil
- **Interfaz web moderna y responsiva** con Material-UI
- **API RESTful robusta** con Node.js y Express.js
- **Base de datos MySQL** con integridad referencial

## 🛠 Tecnologías

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MySQL2** - Cliente MySQL con promesas
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - Biblioteca de interfaz de usuario
- **Material-UI** - Componentes de interfaz
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Vite** - Herramienta de desarrollo

### Base de Datos
- **MySQL** - Sistema de gestión de base de datos

## 📋 Requisitos Previos

- **Node.js** >= 16.0.0
- **MySQL Server** >= 8.0
- **npm** >= 8.0.0

## 🚀 Instalación Rápida

1. **Clona el repositorio:**
```bash
git clone <url-del-repositorio>
cd windsuf-2
```

2. **Configura la base de datos:**
```bash
# Ejecuta el script SQL para crear las tablas
mysql -u root -p < database_setup.sql
```

3. **Instala y ejecuta el backend:**
```bash
cd jardininfantil-backend
npm install
npm run dev
```

4. **Instala y ejecuta el frontend:**
```bash
cd ../jardininfantil-frontend
npm install
npm run dev
```

5. **Accede a la aplicación:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Documentación API: http://localhost:4000/api/health

## 📁 Estructura del Proyecto

```
windsurf-2/
├── jardininfantil-backend/    # API Backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
├── jardininfantil-frontend/   # Aplicación React
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── database_setup.sql         # Script de base de datos
```

## 🔧 Configuración

### Variables de Entorno Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_secreta
DB_DATABASE=jardin_infantil_db
PORT=4000
NODE_ENV=development
```

### Variables de Entorno Frontend (.env)
```env
VITE_API_URL=http://localhost:4000/api
```

## 📊 Base de Datos

### Tablas Principales
- **profesores** - Información del personal docente
- **aulas** - Aulas con profesor principal asignado
- **alumnos** - Información de los niños inscritos
- **tutores** - Padres y apoderados
- **alumnos_tutores** - Relación muchos a muchos
- **asistencia** - Registro diario de asistencia
- **informes_diarios** - Informes de desarrollo infantil

### Datos de Ejemplo Incluidos
- 1 Profesor (Carla Santana)
- 1 Aula (Sala Amarilla)
- 1 Alumno (Luis Gomez)
- 1 Tutor (Marta Lopez)

## 🌟 Módulos del Sistema

### 👶 Gestión de Alumnos
- Registro de información personal
- Cálculo automático de edad
- Asignación a aulas
- Vinculación con tutores

### 🏫 Gestión de Aulas
- Creación y administración de aulas
- Asignación de profesores principales
- Control de capacidad

### 👨‍👩‍👧‍👦 Gestión de Tutores
- Información de padres/apoderados
- Relaciones familiares
- Contacto y comunicación

### 👨‍🏫 Gestión de Profesores
- Personal docente
- Asignaciones a aulas

### ✅ Registro de Asistencia
- Interfaz intuitiva por aula
- Registro masivo de asistencia
- Historial por fecha

### 📊 Informes Diarios
- Seguimiento del desarrollo infantil
- Estados de ánimo y alimentación
- Observaciones para padres

## 🔄 API Endpoints

### Alumnos
- `GET /api/alumnos` - Lista completa
- `POST /api/alumnos` - Crear alumno
- `PUT /api/alumnos/:id` - Actualizar
- `DELETE /api/alumnos/:id` - Eliminar

### Asistencia
- `GET /api/asistencia/aula/:id/fecha/:fecha` - Por aula y fecha
- `POST /api/asistencia` - Registrar asistencia

### Informes
- `GET /api/informes/alumno/:id/fecha/:fecha` - Por alumno y fecha
- `POST /api/informes` - Crear/actualizar informe

## 🎨 Interfaz de Usuario

- **Dashboard principal** con navegación intuitiva
- **Tablas responsivas** con acciones rápidas
- **Formularios modales** para edición
- **Notificaciones** de éxito y error
- **Diseño Material Design** consistente

## 🔒 Seguridad

- Validación de datos en backend y frontend
- Sanitización de entradas
- Manejo seguro de errores
- Protección contra inyecciones SQL

## 🚀 Despliegue

### Desarrollo
```bash
# Backend
cd jardininfantil-backend
npm run dev

# Frontend
cd jardininfantil-frontend
npm run dev
```

### Producción
```bash
# Backend
npm run start

# Frontend
npm run build
npm run preview
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Soporte

Para soporte técnico o preguntas, contacta al equipo de desarrollo.

---

**¡Gracias por usar JardinInfantilPRO!** 🌟
