# Autos Colombia Backend

## Descripción del Proyecto
Autos Colombia es un sistema de gestión de vehículos que permite a los administradores registrar la entrada y salida de vehículos, gestionar clientes y mensualidades, y generar reportes de movimientos. Este proyecto está construido con Node.js y TypeScript, utilizando Express como framework web y SQL Server como base de datos.

## Estructura del Proyecto
El proyecto está organizado en varias carpetas y archivos, cada uno con una función específica:

- **src/**: Contiene el código fuente de la aplicación.
  - **app.ts**: Inicializa la aplicación Express y configura middleware.
  - **server.ts**: Inicia el servidor y escucha en un puerto especificado.
  - **config/**: Configuraciones de la aplicación y conexión a la base de datos.
  - **routes/**: Define las rutas de la API.
  - **controllers/**: Contiene la lógica de negocio para manejar las solicitudes.
  - **services/**: Contiene la lógica de negocio relacionada con la autenticación, movimientos y reportes.
  - **repositories/**: Maneja las operaciones de base de datos.
  - **models/**: Define las entidades del sistema.
  - **dto/**: Define los objetos de transferencia de datos.
  - **middleware/**: Contiene middleware para autenticación y manejo de errores.
  - **utils/**: Funciones utilitarias.
  - **migrations/**: Información sobre migraciones de base de datos.
  - **types/**: Tipos personalizados de TypeScript.

- **sql/**: Contiene el esquema SQL para la base de datos.

- **tests/**: Contiene pruebas unitarias e integradas.

- **.env.example**: Ejemplo de variables de entorno.

- **package.json**: Lista de dependencias y scripts del proyecto.

- **tsconfig.json**: Opciones del compilador TypeScript.

- **ormconfig.json**: Configuraciones para el ORM.

## Instalación
1. Clona el repositorio:
   ```
   git clone <url-del-repositorio>
   ```
2. Navega al directorio del proyecto:
   ```
   cd autos-colombia-backend
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Configura las variables de entorno en un archivo `.env` basado en `.env.example`.

## Uso
Para iniciar el servidor, ejecuta:
```
npm start
```

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cambios.

## Licencia
Este proyecto está bajo la Licencia MIT.