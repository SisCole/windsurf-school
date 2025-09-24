-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS jardin_infantil_db;
USE jardin_infantil_db;

-- Tabla de Profesores
CREATE TABLE profesores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Tabla de Aulas
CREATE TABLE aulas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_aula VARCHAR(100) NOT NULL,
    id_profesor_principal INT,
    FOREIGN KEY (id_profesor_principal) REFERENCES profesores(id) ON DELETE SET NULL
);

-- Tabla de Alumnos
CREATE TABLE alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    id_aula INT,
    FOREIGN KEY (id_aula) REFERENCES aulas(id) ON DELETE SET NULL
);

-- Tabla de Tutores (Padres/Apoderados)
CREATE TABLE tutores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    relacion VARCHAR(50) -- Ej: 'Madre', 'Padre'
);

-- Tabla de Unión para Alumnos y Tutores (Relación Muchos a Muchos)
CREATE TABLE alumnos_tutores (
    id_alumno INT,
    id_tutor INT,
    PRIMARY KEY (id_alumno, id_tutor),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_tutor) REFERENCES tutores(id) ON DELETE CASCADE
);

-- Tabla de Asistencia
CREATE TABLE asistencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    fecha DATE NOT NULL,
    estado ENUM('Presente', 'Ausente') NOT NULL,
    UNIQUE KEY asistencia_unica (id_alumno, fecha),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id) ON DELETE CASCADE
);

-- Tabla de Informes Diarios
CREATE TABLE informes_diarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    fecha DATE NOT NULL,
    estado_animo ENUM('Feliz', 'Tranquilo', 'Irritable', 'Somnoliento'),
    almuerzo ENUM('Comió todo', 'Comió bien', 'Comió poco', 'No comió'),
    siesta_horas DECIMAL(3, 1),
    notas TEXT,
    UNIQUE KEY informe_unico (id_alumno, fecha),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo
INSERT INTO profesores (nombre, apellido, email) VALUES ('Carla', 'Santana', 'carla.s@jardin.com');
INSERT INTO aulas (nombre_aula, id_profesor_principal) VALUES ('Sala Amarilla', 1);
INSERT INTO alumnos (nombre, apellido, fecha_nacimiento, id_aula) VALUES ('Luis', 'Gomez', '2020-05-15', 1);
INSERT INTO tutores (nombre, apellido, email, telefono, relacion) VALUES ('Marta', 'Lopez', 'marta.l@email.com', '11223344', 'Madre');
INSERT INTO alumnos_tutores (id_alumno, id_tutor) VALUES (1, 1);
