@echo off
echo 🚀 Instalando JardinInfantilPRO...
echo ==================================
echo.

REM Colores para output (Windows)
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "NC=[0m"

REM Función para imprimir con color
goto :print_status

:print_status
echo %GREEN%[INFO]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARN]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

:print_success
echo %GREEN%[SUCCESS]%NC% %~1
goto :eof

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "Node.js no está instalado. Por favor instálalo primero."
    echo Descárgalo desde: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "npm no está instalado. Por favor instálalo primero."
    pause
    exit /b 1
)

call :print_status "Node.js %node --version%" y npm %npm --version%" detectados."
echo.

REM Verificar si MySQL está instalado
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_warning "MySQL no está instalado. Asegúrate de tener MySQL Server ejecutándose."
    echo Puedes instalar MySQL desde: https://dev.mysql.com/downloads/mysql/
    echo.
)

REM Instalar backend
call :print_status "Instalando backend..."
cd jardininfantil-backend

if exist "package.json" (
    call :print_status "Instalando dependencias del backend..."
    npm install
    if %errorlevel% equ 0 (
        call :print_success "Backend instalado correctamente."
    ) else (
        call :print_error "Error al instalar el backend."
        cd ..
        pause
        exit /b 1
    )
) else (
    call :print_error "No se encontró package.json en el backend."
    cd ..
    pause
    exit /b 1
)

cd ..

REM Instalar frontend
call :print_status "Instalando frontend..."
cd jardininfantil-frontend

if exist "package.json" (
    call :print_status "Instalando dependencias del frontend..."
    npm install
    if %errorlevel% equ 0 (
        call :print_success "Frontend instalado correctamente."
    ) else (
        call :print_error "Error al instalar el frontend."
        cd ..
        pause
        exit /b 1
    )
) else (
    call :print_error "No se encontró package.json en el frontend."
    cd ..
    pause
    exit /b 1
)

cd ..

REM Configurar base de datos
call :print_status "Configurando base de datos..."
echo.

REM Verificar si el archivo SQL existe
if exist "database_setup.sql" (
    call :print_warning "Para configurar la base de datos, ejecuta el siguiente comando:"
    echo mysql -u root -p ^< database_setup.sql
    call :print_warning "Asegúrate de que MySQL Server esté ejecutándose."
    echo.
) else (
    call :print_error "No se encontró el archivo database_setup.sql"
    pause
    exit /b 1
)

REM Crear archivos .env si no existen
call :print_status "Verificando archivos de configuración..."
echo.

REM Backend .env
if not exist "jardininfantil-backend\.env" (
    call :print_warning "Creando archivo .env para el backend..."
    (
        echo DB_HOST=localhost
        echo DB_USER=root
        echo DB_PASSWORD=tu_contraseña_secreta
        echo DB_DATABASE=jardin_infantil_db
        echo PORT=4000
        echo NODE_ENV=development
    ) > jardininfantil-backend\.env
    call :print_success "Archivo .env del backend creado."
) else (
    call :print_status "Archivo .env del backend ya existe."
)

REM Frontend .env
if not exist "jardininfantil-frontend\.env" (
    call :print_warning "Creando archivo .env para el frontend..."
    (
        echo VITE_API_URL=http://localhost:4000/api
    ) > jardininfantil-frontend\.env
    call :print_success "Archivo .env del frontend creado."
) else (
    call :print_status "Archivo .env del frontend ya existe."
)

echo.
call :print_success "¡Instalación completada!"
echo.
echo 📋 Próximos pasos:
echo 1. Configura MySQL y ejecuta el script de base de datos:
echo    mysql -u root -p ^< database_setup.sql
echo.
echo 2. Inicia el backend:
echo    cd jardininfantil-backend ^&^& npm run dev
echo.
echo 3. Inicia el frontend ^(en otra terminal^):
echo    cd jardininfantil-frontend ^&^& npm run dev
echo.
echo 🌐 Accederás a:
echo    - Frontend: http://localhost:3000
echo    - Backend API: http://localhost:4000
echo    - Health Check: http://localhost:4000/api/health
echo.
call :print_success "¡Disfruta usando JardinInfantilPRO! 🌟"
echo.
pause
