# Coderhouse BE3 - Gestión de Adopciones de Mascotas

- Este proyecto es una API para la gestión de adopciones de mascotas, desarrollada como parte del curso de Backend en Coderhouse.
- Comision 74605

## Autor

- Martin dos Santos

## Características principales

- Gestión de usuarios
- Gestión de mascotas
- Gestión de adopciones
- Mocking de datos para pruebas

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tinchods93/coderhouse-be3
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Docker

Puedes utilizar la imagen de Docker disponible en:

[Enlace a la imagen de Docker](https://hub.docker.com/r/martinds93/coderhouse-be3)

Para ejecutar el proyecto con Docker:

```bash
docker pull martinds93/coderhouse-be3
docker run -p 8080:8080 martinds93/coderhouse-be3
```

## Uso

1. Inicia el servidor:
   ```bash
   npm start
   ```
2. Accede a las rutas disponibles para gestionar usuarios, mascotas y adopciones.

## Estructura del proyecto

- `src/controllers/`: Controladores de las rutas
- `src/dao/`: Acceso a datos y modelos
- `src/dto/`: Data Transfer Objects
- `src/public/`: Archivos públicos (imágenes, etc.)
- `src/repository/`: Repositorios de datos
- `src/routes/`: Definición de rutas
- `src/services/`: Lógica de negocio
- `src/utils/`: Utilidades y helpers
