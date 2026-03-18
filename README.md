# Monorepo: Laravel API & Next.js Frontend

Este repositorio contiene una aplicación *full-stack* dividida en dos servicios principales: un backend *headless* construido con Laravel y un frontend moderno con Next.js. La infraestructura de base de datos está gestionada mediante Docker.

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura de monorepo simplificada:

- `/backend`: API RESTful con Laravel (PHP).
- `/frontend`: Aplicación cliente con Next.js (React/TypeScript).
- `docker-compose.yml`: Orquestación de servicios de infraestructura (MySQL & Adminer).

## 🛠️ Requisitos Previos

Para ejecutar este proyecto en un entorno local (idealmente Debian/Linux), asegúrate de tener instalado:

- [Docker](https://docs.docker.com/engine/install/debian/) y Docker Compose.
- [PHP 8.x](https://www.php.net/) y [Composer](https://getcomposer.org/).
- [Node.js](https://nodejs.org/) (v20 o superior) y npm/pnpm.

## 🚀 Instalación y Uso

Sigue estos pasos para levantar el entorno de desarrollo completo.

### 1. Levantar la Infraestructura (Base de Datos)

Inicia los contenedores de MySQL y Adminer en segundo plano:

```bash
docker compose up -d
````
```
```

### 2. Configurar el Backend (Laravel)

Abre una terminal, navega a la carpeta del backend y prepara el entorno de PHP:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Asegúrate de configurar las credenciales de la base de datos en tu archivo `backend/.env` para que coincidan con el `docker-compose.yml`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=secret_password
```

Luego, ejecuta las migraciones y levanta el servidor de desarrollo:
```bash
php artisan migrate
php artisan serve
```
* La API estará disponible en `http://localhost:8000`.

### 3. Configurar el Frontend (Next.js)

En una nueva terminal, navega a la carpeta del frontend y prepara el entorno de Node:

```bash
cd frontend
npm install
npm run dev
```
* El frontend estará disponible en `http://localhost:3000`.

## 💻 Notas para el Desarrollo (Editores)

La separación en carpetas distintas garantiza que los servidores de lenguaje (LSP) funcionen de forma aislada. Si utilizas editores como Neovim, los clientes de `intelephense`/`phpactor` se activarán de forma independiente en `/backend`, mientras que `vtsls`/`tsserver` lo harán en `/frontend`, evitando conflictos de tipos y optimizando el rendimiento.
```

---

¿Te gustaría que pasemos a configurar el CORS en tu proyecto de Laravel para que el frontend en el puerto 3000 pueda hacer peticiones a la API en el puerto 8000 sin errores de seguridad?

---

### English Correction
* **Original:** "Creame un readme.md para este proyecto"
* **Corrected:** "Create a README.md for this project."
* **Note:** Added the missing accent mark in Spanish implicitly ("Créame"), and in English, "README" is typically fully capitalized as it is an acronym/convention.
