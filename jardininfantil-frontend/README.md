# JardinInfantilPRO - Frontend

Frontend del sistema de gestión de jardín infantil desarrollado con React.js y Material-UI.

## Características

- **Interfaz moderna** con Material-UI
- **React Router** para navegación
- **Axios** para comunicación con la API
- **Responsive design** para diferentes dispositivos
- **Gestión de estado** con React hooks
- **Validación de formularios** integrada

## Tecnologías

- **React.js** - Biblioteca para interfaces de usuario
- **Material-UI** - Componentes de interfaz
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Vite** - Herramienta de desarrollo
- **Date-fns** - Manipulación de fechas

## Requisitos Previos

- Node.js >= 16.0.0
- npm >= 8.0.0

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd jardininfantil-frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```env
VITE_API_URL=http://localhost:4000/api
```

## Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run preview
```

El servidor de desarrollo se ejecutará en `http://localhost:3000`

## Módulos Disponibles

### 🏠 Inicio
- Dashboard principal con navegación a todos los módulos
- Vista general del sistema

### 👶 Alumnos
- Lista completa de alumnos con información detallada
- Crear, editar y eliminar alumnos
- Asignación de aulas y cálculo automático de edad

### 🏫 Aulas
- Gestión de aulas y profesores principales
- Control de capacidad y alumnos inscritos

### 👨‍👩‍👧‍👦 Tutores
- Gestión de padres y apoderados
- Relación con alumnos

### 👨‍🏫 Profesores
- Gestión del personal docente
- Asignación a aulas

### ✅ Asistencia
- Registro diario de asistencia por aula
- Interfaz intuitiva con botones Presente/Ausente
- Guardado masivo de cambios

### 📊 Informes Diarios
- Informes personalizados por alumno y fecha
- Campos: estado de ánimo, almuerzo, siesta, notas
- Historial de informes

## Estructura del Proyecto

```
jardininfantil-frontend/
├── src/
│   ├── api/                   # Servicios API
│   │   ├── alumnoService.js
│   │   ├── aulaService.js
│   │   ├── asistenciaService.js
│   │   ├── informeService.js
│   │   ├── tutorService.js
│   │   └── profesorService.js
│   ├── components/
│   │   └── Navbar.jsx         # Barra de navegación
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   ├── alumnos/
│   │   │   └── AlumnosLista.jsx
│   │   ├── asistencia/
│   │   │   └── RegistroAsistencia.jsx
│   │   └── informes/
│   │       └── InformeDiario.jsx
│   ├── App.jsx               # Configuración de rutas
│   ├── main.jsx              # Punto de entrada
│   └── index.css             # Estilos globales
├── .env                      # Variables de entorno
├── vite.config.js            # Configuración de Vite
└── package.json
```

## Características de la Interfaz

### 🎨 Diseño
- Tema Material Design
- Colores consistentes y accesibles
- Tipografía clara y legible

### 📱 Responsive
- Adaptable a móviles, tablets y desktop
- Componentes flexibles
- Navegación optimizada

### ⚡ Performance
- Carga diferida de componentes
- Optimización de renders
- Manejo eficiente del estado

### 🔒 Usabilidad
- Validación de formularios en tiempo real
- Mensajes de error claros
- Confirmaciones para acciones destructivas

## Navegación

La aplicación utiliza React Router para la navegación:

- `/` - Página de inicio
- `/alumnos` - Gestión de alumnos
- `/asistencia` - Registro de asistencia
- `/informes` - Informes diarios

## Desarrollo

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta el linter

### Convenciones de Código

- Nombres de componentes en PascalCase
- Archivos de servicios en camelCase
- Uso consistente de hooks
- PropTypes para validación de props

## Despliegue

### Construir para Producción
```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

### Variables de Entorno para Producción
```env
VITE_API_URL=https://tu-api-production.com/api
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
