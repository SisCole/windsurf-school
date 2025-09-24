#!/bin/bash

echo "🚀 Instalando JardinInfantilPRO..."
echo "=================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor instálalo primero."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado. Por favor instálalo primero."
    exit 1
fi

print_status "Node.js $(node -v) y npm $(npm -v) detectados."

# Verificar si MySQL está instalado
if ! command -v mysql &> /dev/null; then
    print_warning "MySQL no está instalado. Asegúrate de tener MySQL Server ejecutándose."
    print_warning "Puedes instalar MySQL desde: https://dev.mysql.com/downloads/mysql/"
fi

# Instalar backend
print_status "Instalando backend..."
cd jardininfantil-backend

if [ -f "package.json" ]; then
    print_status "Instalando dependencias del backend..."
    npm install

    if [ $? -eq 0 ]; then
        print_success "Backend instalado correctamente."
    else
        print_error "Error al instalar el backend."
        exit 1
    fi
else
    print_error "No se encontró package.json en el backend."
    exit 1
fi

cd ..

# Instalar frontend
print_status "Instalando frontend..."
cd jardininfantil-frontend

if [ -f "package.json" ]; then
    print_status "Instalando dependencias del frontend..."
    npm install

    if [ $? -eq 0 ]; then
        print_success "Frontend instalado correctamente."
    else
        print_error "Error al instalar el frontend."
        exit 1
    fi
else
    print_error "No se encontró package.json en el frontend."
    exit 1
fi

cd ..

# Configurar base de datos
print_status "Configurando base de datos..."

# Verificar si el archivo SQL existe
if [ -f "database_setup.sql" ]; then
    print_warning "Para configurar la base de datos, ejecuta el siguiente comando:"
    echo "mysql -u root -p < database_setup.sql"
    print_warning "Asegúrate de que MySQL Server esté ejecutándose."
else
    print_error "No se encontró el archivo database_setup.sql"
    exit 1
fi

# Crear archivos .env si no existen
print_status "Verificando archivos de configuración..."

# Backend .env
if [ ! -f "jardininfantil-backend/.env" ]; then
    print_warning "Creando archivo .env para el backend..."
    cat > jardininfantil-backend/.env << EOL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_secreta
DB_DATABASE=jardin_infantil_db
PORT=4000
NODE_ENV=development
EOL
    print_success "Archivo .env del backend creado."
else
    print_status "Archivo .env del backend ya existe."
fi

# Frontend .env
if [ ! -f "jardininfantil-frontend/.env" ]; then
    print_warning "Creando archivo .env para el frontend..."
    cat > jardininfantil-frontend/.env << EOL
VITE_API_URL=http://localhost:4000/api
EOL
    print_success "Archivo .env del frontend creado."
else
    print_status "Archivo .env del frontend ya existe."
fi

print_success "¡Instalación completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura MySQL y ejecuta el script de base de datos:"
echo "   mysql -u root -p < database_setup.sql"
echo ""
echo "2. Inicia el backend:"
echo "   cd jardininfantil-backend && npm run dev"
echo ""
echo "3. Inicia el frontend (en otra terminal):"
echo "   cd jardininfantil-frontend && npm run dev"
echo ""
echo "🌐 Accederá a:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:4000"
echo "   - Health Check: http://localhost:4000/api/health"
echo ""
print_success "¡Disfruta usando JardinInfantilPRO! 🌟"
